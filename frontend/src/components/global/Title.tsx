interface IProps {
  title: string;
}

const Title = (props: IProps) => {
  return (
    <h2 className="text-gray-700 mb-4 text-3xl md:text-4xl font-semibold tracking-tight">
      {props.title}
    </h2>
  );
};

export default Title;
