import { Circle, Document, Font, Image, Page, Path, StyleSheet, Svg, Text, View } from "@react-pdf/renderer"
import localCustom from "../helpers/localCustom"
import { useEffect, useState } from "react";
import { format } from "date-fns";

export const PDF = (
    { 
        aspirant = 'ASPIRANT_NAME', 
        lecturaScore = 0, 
        matematicasScore = 0, 
        pensamientoScore = 0, 
        sex,
        date,
        origin,
    }
) => {
    const [ totalScore, setTotalScore ] = useState(lecturaScore + matematicasScore + pensamientoScore);

    useEffect(() => {
        setTotalScore(lecturaScore + matematicasScore + pensamientoScore);
    }, [lecturaScore, matematicasScore, pensamientoScore]);
    
    Font.register({ family: 'Inter', fonts: [
        { src: '/fonts/Inter_28pt-Thin.ttf', fontWeight: 100 },
        { src: '/fonts/Inter_28pt-Light.ttf', fontWeight: 200 },
        { src: '/fonts/Inter_28pt-ExtraLight.ttf', fontWeight: 300 },
        { src: '/fonts/Inter_28pt-Regular.ttf', fontWeight: 400 },
        { src: '/fonts/Inter_28pt-Medium.ttf', fontWeight: 500 },
        { src: '/fonts/Inter_28pt-SemiBold.ttf', fontWeight: 600 },
        { src: '/fonts/Inter_28pt-Bold.ttf', fontWeight: 700 },
        { src: '/fonts/Inter_28pt-ExtraBold.ttf', fontWeight: 800 },
        { src: '/fonts/Inter_28pt-Black.ttf', fontWeight: 900 },
        
    ] });


    Font.registerHyphenationCallback((word) => {
        return [word];
    });
    
    const styles = StyleSheet.create({
        gloablFont: {
            fontFamily: 'Inter',
        },
        header: {
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
        },
        headerImages: {
            position: 'relative',
            marginTop: 15,
            width: '100%',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
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
        }
    })

    const validateScoreByExam = () => {
        if (origin === 'PREPARATORIA') {
            return totalScore >= 1000 ? 'sobresaliente' : totalScore <= 999 && totalScore >= 780 ? 'satisfactorio' : 'insuficiente';
        } else {
            return totalScore >= 800 ? 'sobresaliente' : totalScore <= 799 && totalScore >= 600 ? 'satisfactorio' : 'insuficiente';
        }
    }
    
    return (
        <Document style={ styles.gloablFont }>
            <Page>
                <View style={ styles.header }>
                    <Image style={{ position: 'absolute', top: 0, width: '100%', zIndex: 2 }} src="/img/pdf/header.png" />
                    <View style={ styles.headerImages }>
                        <Image style={{ width: 90, position: "absolute", left: 65, top: 15 }} src={ origin === 'PREPARATORIA' ? '/img/pdf/prepa_anahuac_logo.png' : '/img/pdf/secundaria_anahuac_logo.png' } />
                        <Image style={{ width: 105 }} src="/img/pdf/logo_anahuac_exha.png" />
                        <Image style={{ width: 125, position: "absolute", right: 65, top: 20 }} src="/img/pdf/exha_logo.png" />
                    </View>
                    <Text style={ styles.title }>CERTIFICADO DE</Text>
                    <Text style={ styles.subTitle }>ACEPTACIÓN</Text>
                </View>
                <View style={{ marginTop: 35, display: 'flex', flexDirection: 'column', gap: 10, paddingLeft: 65, paddingRight: 65, textAlign: 'justify', fontSize: 12, lineHeight: 1.5, position: 'relative', zIndex: 1 }}>
                    <Text>{ sex === 'MASCULINO' ? 'Estimado' : 'Estimada' }: <Text style={{ textTransform: 'uppercase', fontWeight: 600 }}>{ aspirant }</Text></Text>

                    <Text style={{ marginTop: 8 }}>
                        A través de estas líneas quiero reconocer tu esfuerzo y compartirte que el resultado 
                        en el examen de admisión que presentaste el&nbsp;
                        <Text style={{ fontWeight: 600, fontSize: 12 }}>
                            { format(date, "dd 'de' MMMM 'del' y", { locale: localCustom }) }&nbsp;
                        </Text>
                        es&nbsp; 
                        <Text style={{ fontWeight: 600, fontSize: 12 }}>
                            { validateScoreByExam() }
                        </Text>, lo cual te hace { sex === 'MASCULINO' ? 'candidato' : 'candidata' } a ser parte de la&nbsp;
                        <Text style={{ fontWeight: 600, fontSize: 12 }}>
                            { origin === 'PREPARATORIA' ? 'Preparatoria' : 'Secundaria' } Anáhuac.
                        </Text>&nbsp;
                        Estamos conscientes 
                        que las habilidades que demostraste tener son producto de tu esfuerzo y la dedicación 
                        de tus padres.
                    </Text>

                    <Text style={{ marginTop: 8 }}>
                        Estás por concluir la&nbsp;
                        <Text style={{ fontWeight: 600, fontSize: 12 }}>
                            { origin.includes('PREPARATORIA') ? 'Secundaria' : 'Primaria' }
                        </Text>, una etapa de muchos aprendizajes y logros que te 
                        permitirá iniciar la&nbsp;
                        <Text style={{ fontWeight: 600, fontSize: 12 }}>
                            { origin.includes('PREPARATORIA') ? 'Preparatoria' : 'Secundaria' }    
                        </Text>, un periodo de gran trascendencia para tu futuro 
                        personal y profesional.
                    </Text>

                    <Text style={{ marginTop: 8 }}>
                        En&nbsp;
                        <Text style={{ fontWeight: 600, fontSize: 12 }}>
                            { origin.includes('PREPARATORIA') ? 'Preparatoria' : 'Secundaria' }    
                        </Text>&nbsp;
                        estamos muy contentos que formes parte de nuestra familia Anáhuac, 
                        trabajando juntos podemos ayudarte a adquirir las herramientas que te permitirán 
                        tener una mejor y más amplia visión del mundo que te rodea, además acceder a un 
                        futuro con mejores oportunidades.
                    </Text>

                    <Text style={{ marginTop: 8 }}>
                        ¡Nos vemos pronto!
                    </Text>
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 20,
                    marginTop: 100,
                    fontSize: 12,
                }}>
                    <View style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: "center" }}>
                        <Text>
                            Colima, Col. a <Text style={{ fontWeight: 600, fontSize: 12 }}>{ format(new Date(), "dd 'de' MMMM 'del' y", { locale: localCustom }) }</Text>
                        </Text>
                        <Text>
                            Atentamente
                        </Text>
                    </View>
                    <Image src={ origin === 'PREPARATORIA' ? '/img/pdf/firma-prepa.png' : '/img/pdf/firma-secundaria.png' } style={{ height: 150 }} />
                    <View style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: "center" }}>
                        <Text>{ origin === 'PREPARATORIA' ? 'Imelda Ivonne Ávalos Vizcaíno' : 'Rosalba Rodríguez Barragán' }</Text>
                        <Text>Directora Académica</Text>
                    </View>
                </View>
                <Image src={'/img/pdf/footer_left.png'} style={{ position: 'absolute', width: 215, left: 0, bottom: 0, zIndex: 2 }} />
                <Image src={'/img/pdf/footer_right.png'} style={{ position: 'absolute', width: 215, right: 0, bottom: 0, zIndex: 2 }} />
            </Page>

            <Page style={{ fontSize: 12 }}>
                <View>
                    <Image src={ origin === 'PREPARATORIA' ? '/img/pdf/header-p2.jpg' : '/img/pdf/header-s2.jpg' } style={{ width: '100%', height: 'auto' }} />
                </View>
                <View style={{ paddingHorizontal: 40 }}>
                    <Text style={{ fontSize: 20, fontWeight: 700, textAlign: 'center', marginVertical: 20 }}>RESULTADOS DE EXAMEN DE ADMISIÓN</Text>
                    <Text>
                        Nombre { sex === 'MASCULINO' ? 'del alumno' : 'de la alumna' }: <Text style={{ fontWeight: 700 }}>{ aspirant }</Text>
                    </Text>
                    <Text>
                        Fecha de aplicación: <Text style={{ fontWeight: 700 }}>{ format(date, "dd 'de' MMMM 'del' y", { locale: localCustom }) }</Text>
                    </Text>
                    <View style={{ display: 'flex', flexDirection: 'column', width: '100%', marginVertical: 20 }}>
                        <View style={{ 
                            display: 'flex', 
                            flexDirection: 'row', 
                            justifyContent: 'space-evenly', 
                            alignItems: 'center', 
                            textAlign: 'center', 
                            fontWeight: 500, 
                            color: '#71717A',
                            paddingVertical: 5,
                        }}>
                            <Text style={{ width: 100 }}>Comprensión lectora y escritura</Text>
                            <Text style={{ width: 100 }}>Habilidades lógico-matemáticas</Text>
                            <Text style={{ width: 100 }}>Habilidades del pensamiento</Text>
                            <Text style={{ width: 100, fontWeight: 700, fontSize: 14 }}>Total</Text>
                        </View>
                        <View style={{ 
                            display: 'flex', 
                            flexDirection: 'row', 
                            justifyContent: 'space-evenly', 
                            alignItems: 'center', 
                            textAlign: 'center', 
                            borderTop: 1.5, 
                            borderBottom: 1.5, 
                            borderColor: '#E4E4E7', 
                            color: '#103CCA', 
                            fontWeight: 700, 
                            fontSize: 20, 
                            paddingVertical: 5
                        }}>
                            <Text style={{ width: 100 }}>{ lecturaScore }</Text>
                            <Text style={{ width: 100 }}>{ matematicasScore }</Text>
                            <Text style={{ width: 100 }}>{ pensamientoScore }</Text>
                            <Text style={{ width: 100, fontSize: 24 }}>{ totalScore }</Text>
                        </View>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 40 }}>
                    <Text style={{ marginBottom: 20 }}>Ya llevas 2 de los 3 simples pasos para ser parte del <Text style={{ fontWeight: 700 }}>{ origin === 'PREPARATORIA' ? 'Preparatoria' : 'Secundaria' } Anáhuac</Text>:</Text>
                    
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: "center", gap: 4 }}>
                        <Text>Examen de Admisión</Text>
                        <Image src={'/img/pdf/check.png'} style={{ width: 14, height: 'auto' }} />
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: "center", gap: 4 }}>
                        <Text>Entrega de Resultados</Text>
                        <Image src={'/img/pdf/check.png'} style={{ width: 14, height: 'auto' }} />
                    </View>
                    
                    <Text style={{ marginBottom: 20 }}>Inscripción</Text> 
                    
                    <Text>Para la inscripción necesitamos:</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Svg viewBox="0 0 20 20" width={5} height={5}>
                            <Circle
                                cx="10"
                                cy="10"
                                r="9"
                                fill="black"
                                />
                        </Svg>
                        <Text>Llenado de ficha de inscripción</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Svg viewBox="0 0 20 20" width={5} height={5}>
                            <Circle
                                cx="10"
                                cy="10"
                                r="9"
                                fill="black"
                            />
                        </Svg>
                        <Text>Recoger fichas del banco y realizar pago</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Svg viewBox="0 0 20 20" width={5} height={5}>
                            <Circle
                                cx="10"
                                cy="10"
                                r="9"
                                fill="black"
                            />
                        </Svg>
                        <Text>Entregar documentación (original y dos copias):</Text>
                    </View>
                    
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4, paddingLeft: 15 }}>
                        <Svg viewBox="0 0 20 20" width={5} height={5}>
                            <Circle
                                cx="10"
                                cy="10"
                                r="9"
                                fill="black"
                            />
                        </Svg>
                        <Text>Certificado de { origin === 'PREPARATORIA' ? 'Preparatoria' : 'Secundaria' }</Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4, paddingLeft: 15 }}>
                        <Svg viewBox="0 0 20 20" width={5} height={5}>
                            <Circle
                                cx="10"
                                cy="10"
                                r="9"
                                fill="black"
                            />
                        </Svg>
                        <Text>Carta de buena conducta (No aplica para Colegio Anáhuac)</Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4, paddingLeft: 15 }}>
                        <Svg viewBox="0 0 20 20" width={5} height={5}>
                            <Circle
                                cx="10"
                                cy="10"
                                r="9"
                                fill="black"
                            />
                        </Svg>
                        <Text>Acta de Nacimiento</Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4, paddingLeft: 15 }}>
                        <Svg viewBox="0 0 20 20" width={5} height={5}>
                            <Circle
                                cx="10"
                                cy="10"
                                r="9"
                                fill="black"
                            />
                        </Svg>
                        <Text>CURP</Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4, paddingLeft: 15 }}>
                        <Svg viewBox="0 0 20 20" width={5} height={5}>
                            <Circle
                                cx="10"
                                cy="10"
                                r="9"
                                fill="black"
                            />
                        </Svg>
                        <Text>4 fotografías tamaño infantil</Text>
                    </View>

                    <Text>Posteriormente se realizará el Examen de Ubicación de Idiomas y la Sesión de Inducción</Text>
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 20,
                    marginTop: 100,
                    fontSize: 12,
                }}>
                    <View style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: "center" }}>
                        <Text>
                            Colima, Col. a <Text style={{ fontWeight: 600, fontSize: 12 }}>{ format(new Date(), "dd 'de' MMMM 'del' y", { locale: localCustom }) }</Text>
                        </Text>
                        <Text>
                            Atentamente
                        </Text>
                    </View>
                    <Image src={ origin === 'PREPARATORIA' ? '/img/pdf/firma-prepa.png' : '/img/pdf/firma-secundaria.png' } style={{ width: 200 }} />
                    <View style={{ display: 'flex', flexDirection: 'column', gap: 5, alignItems: "center" }}>
                        <Text>{ origin === 'PREPARATORIA' ? 'Imelda Ivonne Ávalos Vizcaíno' : 'Rosalba Rodríguez Barragán' }</Text>
                        <Text>Directora Académica</Text>
                    </View>
                </View>
                <Image src={'/img/pdf/footer_left.png'} style={{ position: 'absolute', width: 215, left: 0, bottom: 0, zIndex: 2 }} />
                <Image src={'/img/pdf/footer_right.png'} style={{ position: 'absolute', width: 215, right: 0, bottom: 0, zIndex: 2 }} />
            </Page>
        </Document>
    )
}
