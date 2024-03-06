import { Grid, Card, Text, Loading } from "@nextui-org/react";
export default function LoadingScreen() {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loading type="points" size="lg" />
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100%;
        }
        @media print {
          @page {
            size: 50mm 150mm;
          }
        }
      `}</style>
    </div>
  );
}
