export function ColumnText({ index, title, children }) {
  return (
    <div key={index} className="flex flex-row w-full h-full">
      <p className="font-medium text-lg w-1/4">{title}</p>
      <div className="w-3/4">
        { children }
      </div>
    </div>
  )
}