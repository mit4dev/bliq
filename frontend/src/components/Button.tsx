type Props = {
  title: string;
  onClick?: () => void;
};

export default function Button({ title, onClick: onClickProp }: Props) {
  const onClick = () => {
    if (typeof onClickProp === "function") {
      onClickProp();
    }
  };

  return (
    <button
      className="flex bg-sky-400 hover:bg-sky-500 active:bg-sky-600 py-2 px-4 items-center rounded-full text-white"
      onClick={onClick}
    >
      {title}
    </button>
  );
}
