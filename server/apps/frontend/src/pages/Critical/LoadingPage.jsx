export const FallBackPage = () => {
  return (
    <>
      <div className="relative w-screen h-screen dark:bg-neutral-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img src="/logo_svg_color.svg" className="w-16 h-16"/>
        </div>
      </div>
    </>
  );
};