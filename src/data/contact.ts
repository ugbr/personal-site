import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';

export interface ContactItem {
  link: string;
  label: string;
  icon: IconDefinition;
}

const data: ContactItem[] = [
  {
    link: 'https://github.com/ugbr',
    label: 'Github',
    icon: faGithub,
  },
  {
    link: 'https://www.linkedin.com/in/uguudei-b-ab4676172/',
    label: 'LinkedIn',
    icon: faLinkedinIn,
  },
  {
    link: 'mailto:uguudei.bayar@gmail.com',
    label: 'Email',
    icon: faEnvelope,
  },
];

export default data;
