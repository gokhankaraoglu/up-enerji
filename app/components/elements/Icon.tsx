import classNames from "classnames";
export enum Icons {
  ARROW_LEFT = "arrowLeft",
  ARROW_RIGHT = "arrowRight",
  CLOSE_ICON = "closeIcon",
  CALENDAR_ICON = "calendarIcon",
  INFO_ICON = "infoIcon",
}

export interface IconProps {
  icon: Icons;
  className?: string;
}

const iconList: Record<Icons, string> = {
  arrowLeft: `<svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.66667 15L1 8M1 8L7.66667 1M1 8L17 8" stroke="#0F1828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
  `,
  arrowRight: `<svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10.3333 1L17 8M17 8L10.3333 15M17 8L1 8" stroke="#0F1828" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  closeIcon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18 6L6 18M18 18L6 6" stroke="#0F1828" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,
  calendarIcon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.14286 7.90176H16.7812M6.48512 2.4375V4.07698M17.3125 2.4375V4.07678M20.5 7.07678L20.5 18.5625C20.5 20.2194 19.1569 21.5625 17.5 21.5625H6.5C4.84315 21.5625 3.5 20.2194 3.5 18.5625V7.07678C3.5 5.41992 4.84315 4.07678 6.5 4.07678H17.5C19.1569 4.07678 20.5 5.41992 20.5 7.07678Z" stroke="#667085" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `,
  infoIcon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_301_99)">
  <path d="M12 12L12 16.5M12 8.66455V8.625M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="#667085" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g><defs><clipPath id="clip0_301_99"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>
  `,
};

export const Icon = ({ icon, className }: IconProps) => {
  const flipClass = icon === Icons.ARROW_LEFT ? "rtl:-scale-x-100" : "";

  return (
    <span
      dangerouslySetInnerHTML={{ __html: iconList[icon] }}
      className={classNames(className, flipClass)}
    />
  );
};
