import {
  Circle,
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Svg,
  Text,
  View,
} from "@react-pdf/renderer";
import { longDate } from "../helpers/longDate";
import { getSecundariaResult, getTotalScore } from "@/helpers/admission";
import { parseMarkup } from "@/helpers/secundariaLetters";

// ? Mismo contenido que la carta Word (certs/sec.js): los textos salen de getSecundariaPlan, que el llamador calcula
// ? (lanza MissingGradeError si falta el grado) y pasa en `plan`.

const rowStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
};

const Bullet = ({ level = 0, children }) => (
  <View style={{ ...rowStyle, paddingLeft: level ? 15 : 0 }}>
    <Svg viewBox="0 0 20 20" width={5} height={5}>
      <Circle cx="10" cy="10" r="9" fill="black" />
    </Svg>
    <Text>{children}</Text>
  </View>
);

const Check = ({ children }) => (
  <View style={rowStyle}>
    <Text>{children}</Text>
    <Image src={"/img/pdf/check.png"} style={{ width: 14, height: "auto" }} />
  </View>
);

const Rich = ({ text, values }) => (
  <>
    {parseMarkup(text, values).map(({ text: part, bold }, i) =>
      bold ? (
        <Text key={i} style={{ fontWeight: 600 }}>
          {part}
        </Text>
      ) : (
        part
      )
    )}
  </>
);

export const PDFSecundaria = ({
  aspirant = "",
  lecturaScore = 0,
  matematicasScore = 0,
  pensamientoScore = 0,
  date,
  sex,
  plan,
}) => {
  const totalScore = getTotalScore(
    lecturaScore,
    matematicasScore,
    pensamientoScore
  );
  const isMale = sex === "MASCULINO";

  Font.register({
    family: "Inter",
    fonts: [
      { src: "/fonts/Inter_28pt-Thin.ttf", fontWeight: 100 },
      { src: "/fonts/Inter_28pt-Light.ttf", fontWeight: 200 },
      { src: "/fonts/Inter_28pt-ExtraLight.ttf", fontWeight: 300 },
      { src: "/fonts/Inter_28pt-Regular.ttf", fontWeight: 400 },
      { src: "/fonts/Inter_28pt-Medium.ttf", fontWeight: 500 },
      { src: "/fonts/Inter_28pt-SemiBold.ttf", fontWeight: 600 },
      { src: "/fonts/Inter_28pt-Bold.ttf", fontWeight: 700 },
      { src: "/fonts/Inter_28pt-ExtraBold.ttf", fontWeight: 800 },
      { src: "/fonts/Inter_28pt-Black.ttf", fontWeight: 900 },
    ],
  });

  Font.registerHyphenationCallback((word) => {
    return [word];
  });

  const styles = StyleSheet.create({
    gloablFont: {
      fontFamily: "Inter",
    },
  });

  const values = {
    fecha: longDate(date),
    resultado: getSecundariaResult(totalScore),
    candidato: isMale ? "candidato" : "candidata",
  };

  const { steps } = plan;

  return (
    <Document style={styles.gloablFont}>
      {plan.letter && (
        <Page size="LETTER" style={{ fontSize: 10 }}>
          <View
            style={{
              marginTop: 180,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              paddingLeft: 65,
              paddingRight: 65,
              textAlign: "justify",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Text>
              {isMale ? "Estimado" : "Estimada"}{" "}
              <Text style={{ textTransform: "uppercase", fontWeight: 600 }}>
                {aspirant}
              </Text>
            </Text>

            {plan.letter.map((text, i) => (
              <Text key={i} style={{ marginTop: 8 }}>
                <Rich text={text} values={values} />
              </Text>
            ))}
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              marginTop: 30,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                alignItems: "center",
              }}
            >
              <Text>Colima, Col. a {longDate(new Date())}</Text>
              <Text>Atentamente</Text>
            </View>
            <Image src="/img/pdf/firma-secundaria.jpg" style={{ height: 55 }} />
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                alignItems: "center",
              }}
            >
              <Text>Rosalba Rodríguez Barragán</Text>
              <Text>Directora Académica</Text>
            </View>
          </View>
        </Page>
      )}

      <Page style={{ fontSize: 10 }} size="LETTER">
        <View style={{ paddingHorizontal: 40, marginTop: 140 }}>
          <Text
            style={{
              fontWeight: 700,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            RESULTADOS DEL EXAMEN DE ADMISIÓN
          </Text>
          <Text>
            Nombre {isMale ? "del alumno" : "de la alumna"}:{" "}
            <Text style={{ fontWeight: 700 }}>{aspirant}</Text>
          </Text>
          <Text>
            Fecha de aplicación:{" "}
            <Text style={{ fontWeight: 700 }}>{longDate(date)}</Text>
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              marginVertical: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                textAlign: "center",
                fontWeight: 500,
                color: "#71717A",
                paddingVertical: 5,
              }}
            >
              <Text style={{ width: 100 }}>
                Comprensión lectora y escritura
              </Text>
              <Text style={{ width: 100 }}>Habilidades lógico-matemáticas</Text>
              <Text style={{ width: 100 }}>Habilidades del pensamiento</Text>
              <Text style={{ width: 100, fontWeight: 700 }}>Total</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                textAlign: "center",
                borderTop: 1.5,
                borderBottom: 1.5,
                borderColor: "#E4E4E7",
                color: "#103CCA",
                fontWeight: 700,
                fontSize: 11,
                paddingVertical: 5,
              }}
            >
              <Text style={{ width: 100 }}>{lecturaScore}</Text>
              <Text style={{ width: 100 }}>{matematicasScore}</Text>
              <Text style={{ width: 100 }}>{pensamientoScore}</Text>
              <Text style={{ width: 100, fontSize: 12 }}>{totalScore}</Text>
            </View>
          </View>
        </View>

        {/* ? Con menos de 500 solo va la hoja de resultados, sin pasos */}
        {steps && (
          <View style={{ paddingHorizontal: 40 }}>
            <Text style={{ marginBottom: 20 }}>
              Ya llevas 2 de los {steps.total} pasos para ser parte de la{" "}
              <Text style={{ fontWeight: 700 }}>Secundaria Anáhuac:</Text>
            </Text>

            <Check>Examen de admisión</Check>
            <Check>Entrega de resultados</Check>
            {steps.pending.map((text) => (
              <Text key={text}>{text}</Text>
            ))}

            <Text style={{ marginBottom: 20 }}>
              Inscripción (previa cita en control escolar)
            </Text>

            <Text>Para la inscripción necesitamos:</Text>
            <Bullet>Llenado de ficha de inscripción.</Bullet>
            <Bullet>Recoger fichas del banco y realizar el pago.</Bullet>
            <Bullet>Entregar documentación (dos copias):</Bullet>
            {steps.enrollmentDocuments.map((text) => (
              <Bullet key={text} level={1}>
                {text}
              </Bullet>
            ))}

            <Text style={{ marginTop: 10 }}>{steps.closing}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};
