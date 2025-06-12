interface Props {
  children?: React.ReactNode;
}

export const Container = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {props.children}
    </div>
  );
};
