import classNames from "classnames";
export enum Icons {
  ARROW_LEFT = "arrowLeft",
  ARROW_RIGHT = "arrowRight",
  CLOSE_ICON = "closeIcon",
  CALENDAR_ICON = "calendarIcon",
  INFO_ICON = "infoIcon",
  CRACK_ICON = "crackIcon",
  CRASH_ICON = "crashIcon",
  FAULTY_ICON = "faultyIcon",
  AQUA_ICON = "aquaIcon",
  VOLTAGE_ICON = "voltageIcon",
  ROBBER_ICON = "robberIcon",
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
  infoIcon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_301_99)">
  <path d="M12 12L12 16.5M12 8.66455V8.625M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="#667085" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g><defs><clipPath id="clip0_301_99"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>
  `,
  crackIcon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.9998 6.00041H14.9998M4.7998 4.80039V19.2004C4.7998 20.5259 5.87432 21.6004 7.1998 21.6004H16.7998C18.1253 21.6004 19.1998 20.5259 19.1998 19.2004V4.8004C19.1998 3.47492 18.1253 2.40041 16.7998 2.4004L7.19981 2.40039C5.87432 2.40039 4.7998 3.47491 4.7998 4.80039ZM11.9998 16.8004H12.0848V16.8773H11.9998V16.8004Z" stroke="#667085" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19 7.5L16.2345 9.34364C16.0939 9.43741 16.0274 9.60947 16.0684 9.77347L16.4281 11.2125C16.4708 11.3833 16.3968 11.5619 16.2459 11.6525L14 13" stroke="#667085" stroke-width="1.6" stroke-linecap="round"/>
  </svg>
  `,
  faultyIcon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 12.9V8.41447M12 16.2248V16.2642M17.6699 20H6.33007C4.7811 20 3.47392 18.9763 3.06265 17.5757C2.88709 16.9778 3.10281 16.3551 3.43276 15.8249L9.10269 5.60102C10.4311 3.46632 13.5689 3.46633 14.8973 5.60103L20.5672 15.8249C20.8972 16.3551 21.1129 16.9778 20.9373 17.5757C20.5261 18.9763 19.2189 20 17.6699 20Z" stroke="#667085" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `,
  crashIcon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 14.5V12.1707C4 11.0392 4.89543 10.122 6 10.122M4 14.5C4 15.6315 4.89543 16.5488 6 16.5488H18C19.1046 16.5488 20 15.6315 20 14.5M4 14.5V17.6341C4 18.3885 4.59695 19 5.33333 19H6.66667C7.40305 19 8 18.3885 8 17.6341V16.5488M20 14.5V12.1707C20 11.0392 19.1046 10.122 18 10.122H6M20 14.5V17.6341C20 18.3885 19.403 19 18.6667 19H17.3333C16.597 19 16 18.3885 16 17.6341V16.5488M6 10.122L7.06939 6.01392C7.22504 5.41602 7.75364 5 8.3577 5H15.7057C16.2796 5 16.7891 5.3762 16.9706 5.93393L18.3333 10.122M6.33333 13.1951H8.66667M15.3333 13.1951H17.6667" stroke="#667085" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `,
  aquaIcon: `<svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.8 13C11.2642 14.6764 9.91757 16.0168 8.2 16.6M8.20005 20.2C4.23 20.2 1 17.1579 1 13.4187C1 8.2 8.20011 1 8.20011 1C8.20011 1 15.4 8.2 15.4 13.4187C15.4 17.158 12.1701 20.2 8.20005 20.2Z" stroke="#667085" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `,
  voltageIcon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.2802 2.40039L3.68018 13.9204H12.0002L11.3602 21.6004L20.3202 10.0804H12.0002L13.2802 3.04039" stroke="#667085" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `,
  robberIcon: `<svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.22451 5.23518C4.22451 5.23518 0.999936 5.76458 1 6.82337C1.00006 7.88217 3.64699 9.47036 9.99976 9.47036C16.3525 9.47036 18.9995 7.88217 18.9995 6.82337C18.9995 5.76458 15.6306 5.23518 15.6306 5.23518M9.99976 14.2349C9.99976 14.2349 5.31123 9.71344 3.64699 12.1173C1.81632 14.7617 5.41766 16.998 8.41157 15.8231C9.10547 15.5508 9.99976 14.7643 9.99976 14.7643C9.99976 14.7643 10.8928 15.554 11.588 15.8231C14.4542 16.9326 17.7918 14.8329 16.3525 12.1173C14.9936 9.55344 9.99976 14.2349 9.99976 14.2349ZM5.45658 1.84698L4.09413 5.59374C3.86888 6.21317 4.29404 6.87729 4.95088 6.93203L7.3423 7.13132C9.11088 7.2787 10.8886 7.2787 12.6572 7.13132L14.9377 6.94127C15.6271 6.88383 16.0513 6.16065 15.7651 5.53092L14.0621 1.78444C13.8572 1.33362 13.3532 1.10068 12.877 1.23672L11.0297 1.76454C10.3549 1.95731 9.64139 1.9692 8.96063 1.79901L6.63891 1.21858C6.14203 1.09436 5.63162 1.36565 5.45658 1.84698Z" stroke="#667085" stroke-width="1.4"/>
  </svg>
  `,
};

export const Icon = ({ icon, className }: IconProps) => {
  const flipClass = icon === Icons.ARROW_LEFT ? "rtl:-scale-x-100" : "";

  return (
    <span
      dangerouslySetInnerHTML={{ __html: iconList[icon] }} // eslint-disable-line react/no-danger
      className={classNames(className, flipClass)}
    />
  );
};
