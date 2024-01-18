export const MetaItem = (props: {
  label: string;
  value:
    | string
    | number
    | boolean
    | object
    | Array<string | number | boolean | object>;
}) => {
  let value = props.value;

  if (Array.isArray(value)) {
    if (value.length === 0) {
      value = "Empty";
      return;
    }

    value = value.join(", ");
  }

  if (typeof value === "object") {
    value = JSON.stringify(value);
  }

  if (typeof value === "boolean") {
    value = value.toString();
  }

  return (
    <div className="flex flex-col">
      <div className="text-xs text-muted-foreground">{props.label}</div>
      <div className="break-words">{value}</div>
    </div>
  );
};
