interface Props {
  children?: React.ReactNode;
}

export const MainWrapper = (props: Props) => {
  return <main className="xl:flex flex-col pt-32 h-full px-2 sm:w-[55rem] w-[95%] hidden">{props.children}</main>;
};
