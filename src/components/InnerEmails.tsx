import { getWidthText } from "../hooks/useTextWidth";
import useInnerText from "../hooks/useInnerText";

const destinatariosData = [
  "angelmaros@latamready.com",
  "a@test.com",
  "examples@test.com",
  "mia@arabia.com",
  "unxorreodeejemplo@arabia.com",
  "uncorreolargoparaversicabeonocabel",
];



export default function InnerEmails() {
  const {ref, innerString, pending} = useInnerText({
    arrayList: destinatariosData,
    separator: "; "
  })
    return (
    <div
      className="innerText"
      ref={ref}
      style={{
        fontSize: "14px",
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {pending > 0 && `y ${pending} mas`}
      <p
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {innerString}
      </p>
    </div>
  );
}
