---
title: 'Measuring an LLM document extractor'
date: '2026-07-27'
description: 'I built a receipt to JSON pipeline, then the part that actually matters: a harness that scores every field and prices the run across three models.'
---

A lot of "AI reads your documents" demos stop at the screenshot where the output looks right once. I wanted to build the part that comes after that: how accurate is it really, per field, and what does it cost to run at scale. This is the write-up.

## The problem

Take a scanned receipt and turn it into structured JSON: company, address, date, total. Easy to demo, hard to trust. The moment you want to hand that JSON to a database or a client, "it looked right" is not good enough. You need numbers: how often each field is actually correct, what it costs per thousand documents, and which model to use.

## What I built

Two things, and the second one is the real point.

A **pipeline**: the receipt text goes to the Anthropic API with a schema attached, comes back as structured JSON, and gets validated at the boundary. The schema is a Pydantic model with rules like "the date has to parse and cannot be in the future, the total has to be a positive number." If the shape is wrong, it fails loudly instead of quietly passing bad data downstream.

An **evaluation harness**: I scored every field against hand-verified labels, cached each run so scoring was free to repeat, and captured token counts and latency on every call so the cost analysis came for free. I ran it over 50 receipts from SROIE, a public scanned-receipt dataset, across three models.

## The results

Scored per field against 50 hand-verified receipts. Cost is per 1,000 documents at list price and at Batch API price (half of list). Latency is the median per call.

| model     | company | address | date  | total | cost/1k | cost/1k (batch) | p50   |
| --------- | ------- | ------- | ----- | ----- | ------- | --------------- | ----- |
| Opus 4.8  | 46/50   | 39/50   | 50/50 | 50/50 | $7.03   | $3.52           | 2.70s |
| Sonnet 5  | 44/50   | 39/50   | 50/50 | 50/50 | $4.24   | $2.12           | 3.81s |
| Haiku 4.5 | 43/50   | 39/50   | 50/50 | 50/50 | $1.10   | $0.55           | 1.46s |

The accuracy is basically flat. Date and total are perfect everywhere, address is a dead tie, and company is within three points. When quality ties like that, the decision stops being about accuracy and starts being about cost and latency, and the small model wins both. Haiku is the cheapest and the fastest. Running it through the Batch API halves the bill, which lands the production number at about 55 cents per thousand receipts.

Paying up for a frontier model buys almost nothing here. Opus is 6.4x the cost of Haiku for three points of company and nothing else. One detail I liked: that 6.4x is not the 5x you would get from the sticker prices, because Haiku's tokenizer counts the same text as fewer tokens. The realized cost ratio and the price-sheet ratio are not the same number, and the only way to know is to read the token counts instead of trusting the ratio.

## Reading the failures

Address is the one field that does not reach 50, so I traced why. The misses split three ways, and only one of them is the model's fault:

- Sometimes the model drops a branch or site line printed below the address. That one is real and promptable.
- Sometimes the labels contradict each other. Two receipts from the same chain with the same street address: one label keeps the outlet name in parentheses, the other drops it. No prompt can satisfy both, because the target disagrees with itself.
- Sometimes the character was already wrong before the model ever saw it. The pipeline runs on the dataset's OCR text, and the OCR occasionally misreads a digit (a postcode arrives as `81760` instead of `81750`). The correct value is not in the input, so there is nothing to copy or fix.

I tried to fix the first case with a sharper prompt. It worked on the target field, but it made the model over-include on a different field, pulling the store's registration number and the owner's name into the company. And once I accounted for run-to-run variance, the net gain sat inside the noise. So I reverted it. A `+1` that is smaller than the `±3` you get from re-running the same thing is not a win, it is luck, and I would rather ship nothing than ship luck.

## Limitations

SROIE is from 2019 and it is public, so these models have very likely seen it during training. That makes the accuracy here an upper bound, not a clean field measurement, the same way you would not trust a student's score on an exam they already had the answer key to. The honest fix is a fresh set the models have not seen: a small batch of invoices I would print and photograph myself, scored the same way and reported next to these numbers. That is the next thing to do, and I would rather say so than present a contaminated benchmark as if it were clean.

The other open question is the OCR itself. Feeding text instead of the image is what causes the third class of misses, and it is a real architectural choice, not an accident. Text is cheaper and it makes the model comparison a clean controlled test, because every model gets the exact same input and the score reflects structuring ability rather than vision. But the image would let the model read characters the OCR got wrong, and use layout the flattened text throws away. The right way to settle which is better is to run the same harness on image input and compare, not to guess. The harness is built for exactly that.

## How I approached it

The receipt fields are almost incidental. The method was the point: measure every field separately so a broken one cannot hide inside a good average, verify the ground truth before trusting it (about 8% of the labels I spot-checked were wrong), read the actual failing rows before believing a number, and treat every prompt change as an experiment with a before and after and a check against run-to-run noise. What comes out the other side is not just an extractor, it is a way to decide with evidence whether one is good enough and which model to run it on.

Stack: Python, Pydantic for the schema and validation, the Anthropic API for the extraction, uv for packaging. Code: [github.com/ugbr/structured-data-extractor](https://github.com/ugbr/structured-data-extractor)
