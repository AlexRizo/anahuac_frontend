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
import localCustom from "../helpers/localCustom";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export const PDFSecundariaRejected = ({
  aspirant = "",
  lecturaScore = 0,
  matematicasScore = 0,
  pensamientoScore = 0,
  date,
  sex,
}) => {
  const [totalScore, setTotalScore] = useState(
    lecturaScore + matematicasScore + pensamientoScore
  );

  useEffect(() => {
    setTotalScore(lecturaScore + matematicasScore + pensamientoScore);
  }, [lecturaScore, matematicasScore, pensamientoScore]);

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
    header: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
    },
    headerImages: {
      position: "relative",
      marginTop: 15,
      width: "100%",
      zIndex: 1,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 65,
    },
    title: {
      fontSize: 24,
      fontWeight: 700,
      marginTop: 30,
    },
    subTitle: {
      fontSize: 30,
      fontWeight: 900,
    },
    textWrap: {
      display: "flex",
      flexWrap: "wrap",
      flexGrow: 1,
      flexBasis: 0,
      padding: 2,
    },
  });

  return (
    <Document style={styles.gloablFont}>
      <Page size="LETTER" style={{ fontSize: 10 }}>
        <View
          style={{
            marginTop: 140,
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
            {sex === "MASCULINO" ? "Estimado" : "Estimada"}:{" "}
            <Text style={{ textTransform: "uppercase", fontWeight: 600 }}>
              {aspirant}
            </Text>
          </Text>

          <Text style={{ marginTop: 8 }}>
            A través de estas líneas quiero reconocer tu esfuerzo y compartirte
            que el resultado en el examen de admisión que presentaste el&nbsp;
            <Text style={{ fontWeight: 600, fontSize: 10 }}>
              {format(date, "dd 'de' MMMM 'del' y", { locale: localCustom })}
              &nbsp;
            </Text>
            es&nbsp;
            <Text style={{ fontWeight: 600, fontSize: 10 }}>
              aún no satisfactorio;{" "}
            </Text>
            sin embargo, estamos conscientes que las habilidades que
            demostraste, las cuales producto de tu esfuerzo, y en el periodo que
            falta para concluir tu primaria, puedes{" "}
            <Text style={{ fontWeight: 600, fontSize: 10 }}>
              fortalecer y consolidar los aprendizajes que necesitas
            </Text>
            para ser&nbsp;
            <Text style={{ fontWeight: 600, fontSize: 10 }}>
              {sex === "MASCULINO" ? "candidato " : "candidata "}
            </Text>
            a ser parte de la&nbsp;
            <Text style={{ fontWeight: 600, fontSize: 10 }}>
              Secundaria Anáhuac.
            </Text>
          </Text>

          <Text style={{ marginTop: 8 }}>
            Estás por concluir la&nbsp;
            <Text style={{ fontWeight: 600, fontSize: 10 }}>Primaria</Text>, una
            etapa de muchos aprendizajes y logros, no obstante, antes de pasar
            al siguiente nivel educativo, requieres comprometerte a reforzar
            algunas áreas, lo que facilitará tu adactación a la&nbsp;
            <Text style={{ fontWeight: 600, fontSize: 10 }}>Secundaria.</Text>
          </Text>

          <Text style={{ marginTop: 8 }}>
            En&nbsp;
            <Text style={{ fontWeight: 600, fontSize: 10 }}>
              Secundaria Anáhuac,&nbsp;
            </Text>
            estamos muy contentos que continúes siendo parte de nuestra familia
            Anáhuac, trabajando juntos podemos ayudarte a adquirir las
            herramientas que te permitirán tener una mejor y más amplia visión
            del mundo que te rodea, además acceder a un futuro con mejores
            oportunidades.
          </Text>

          <Text style={{ marginTop: 8 }}>
            ¡Nos vemos pronto!
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 15,
            fontSize: 11,
            position: "absolute",
            bottom: 110,
            left: "50%",
            transform: "translateX(-100%)",
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
            <Text>
              Colima, Col. a&nbsp;
              <Text style={{ fontWeight: 600 }}>
                {format(new Date(), "dd 'de' MMMM 'del' y", {
                  locale: localCustom,
                })}
              </Text>
            </Text>
            <Text>Atentamente</Text>
          </View>
          <Image src="/img/pdf/firma-secundaria.jpg" style={{ height: 45 }} />
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

      <Page style={{ fontSize: 10 }} size="LETTER">
        <View style={{ paddingHorizontal: 40, marginTop: 140 }}>
          <Text
            style={{
              fontWeight: 700,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            RESULTADOS DE EXAMEN DE ADMISIÓN
          </Text>
          <Text>
            Nombre {sex === "MASCULINO" ? "del alumno" : "de la alumna"}:{" "}
            <Text style={{ fontWeight: 700 }}>{aspirant}</Text>
          </Text>
          <Text>
            Fecha de aplicación:{" "}
            <Text style={{ fontWeight: 700 }}>
              {format(date, "dd 'de' MMMM 'del' y", { locale: localCustom })}
            </Text>
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
        <View style={{ paddingHorizontal: 40 }}>
          <Text style={{ marginBottom: 20 }}>
            Ya llevas 2 de los 5 pasos para ser parte de la&nbsp;
            <Text style={{ fontWeight: 700 }}>Secundaria Anáhuac</Text>:
          </Text>

          {/* Examen de Admisión */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Text>Examen de Admisión</Text>
            <Image
              src={"/img/pdf/check.png"}
              style={{ width: 14, height: "auto" }}
            />
          </View>

          {/* Entrega de Resultados */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Text>Entrega de Resultados</Text>
            <Image
              src={"/img/pdf/check.png"}
              style={{ width: 14, height: "auto" }}
            />
          </View>

          {/* Entrevista con Departamento Psicopedagógico */}
          <Text>Entrevista con Departamento Psicopedagógico (previa cita)</Text>

          {/* Plan de trabajo */}
          <Text>Plan de trabajo</Text>

          {/* Inscripción */}
          <Text style={{ marginBottom: 20 }}>Inscripción (previa cita)</Text>

          <Text>Para la inscripción necesitamos:</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Svg viewBox="0 0 20 20" width={5} height={5}>
              <Circle cx="10" cy="10" r="9" fill="black" />
            </Svg>
            <Text>Llenado de ficha de inscripción</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Svg viewBox="0 0 20 20" width={5} height={5}>
              <Circle cx="10" cy="10" r="9" fill="black" />
            </Svg>
            <Text>Recoger fichas del banco y realizar pago</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Svg viewBox="0 0 20 20" width={5} height={5}>
              <Circle cx="10" cy="10" r="9" fill="black" />
            </Svg>
            <Text>Entregar documentación (original y dos copias):</Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              paddingLeft: 15,
            }}
          >
            <Svg viewBox="0 0 20 20" width={5} height={5}>
              <Circle cx="10" cy="10" r="9" fill="black" />
            </Svg>
            <Text>Certificado de Primaria</Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              paddingLeft: 15,
            }}
          >
            <Svg viewBox="0 0 20 20" width={5} height={5}>
              <Circle cx="10" cy="10" r="9" fill="black" />
            </Svg>
            <Text>
              Carta de buena conducta (No aplica para Colegio Anáhuac)
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              paddingLeft: 15,
            }}
          >
            <Svg viewBox="0 0 20 20" width={5} height={5}>
              <Circle cx="10" cy="10" r="9" fill="black" />
            </Svg>
            <Text>Acta de Nacimiento</Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              paddingLeft: 15,
            }}
          >
            <Svg viewBox="0 0 20 20" width={5} height={5}>
              <Circle cx="10" cy="10" r="9" fill="black" />
            </Svg>
            <Text>CURP</Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              paddingLeft: 15,
            }}
          >
            <Svg viewBox="0 0 20 20" width={5} height={5}>
              <Circle cx="10" cy="10" r="9" fill="black" />
            </Svg>
            <Text>4 fotografías tamaño infantil</Text>
          </View>

          <Text>
            Posteriormente se realizará el Examen de Ubicación de Idiomas y la
            Sesión de Inducción
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 15,
            position: "absolute",
            bottom: 110,
            left: "50%",
            transform: "translateX(-100%)",
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
            <Text>
              Colima, Col. a{" "}
              <Text style={{ fontWeight: 600 }}>
                {format(new Date(), "dd 'de' MMMM 'del' y", {
                  locale: localCustom,
                })}
              </Text>
            </Text>
            <Text>Atentamente</Text>
          </View>
          <Image src="/img/pdf/firma-secundaria.jpg" style={{ height: 45 }} />
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
    </Document>
  );
};
