import { Document, Font, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer"

export const PDF = ({ aspirant = 'Natalia Rivera Chávez', lecturaScore = 0, matematicasScore = 0, pensamientoScore = 0 }) => {
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
            width: 100,
            height: 'auto',
            zIndex: 1,
        },
        title: {
            fontSize: 24,
            fontWeight: 700,
            marginTop: 20,
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
    
    return (
        <Document style={ styles.gloablFont }>
            <Page>
                <View style={ styles.header }>
                    <Image style={{ position: 'absolute', top: 0, width: '100%', zIndex: 2 }} src="/img/pdf/header.png" />
                    <Image style={ styles.headerImages } src="/img/pdf/logo_anahuac_exha.png" />
                    <Text style={ styles.title }>CERTIFICADO DE</Text>
                    <Text style={ styles.subTitle }>ACEPTACIÓN</Text>
                </View>
                <View style={{ marginTop: 50, display: 'flex', flexDirection: 'column', gap: 10, paddingLeft: 50, paddingRight: 50, textAlign: 'justify' }}>
                    <Text>Estimada: <Text style={{ textTransform: 'uppercase', fontWeight: 600 }}>{ aspirant }</Text></Text>

                    <Text >
                        A través de estas líneas quiero reconocer tu esfuerzo y compartirte que el resultado 
                        en el examen de admisión que presentaste el fecha de aplicación es sobresaliente, 
                        lo cual te hace candidata a ser parte de la Preparatoria Anáhuac. Estamos conscientes 
                        que las habilidades que demostraste tener son producto de tu esfuerzo y la dedicación 
                        de tus padres.
                    </Text>

                    <Text>
                        Estás por concluir la Secundaria, una etapa de muchos aprendizajes y logros que te 
                        permitirá iniciar la Preparatoria, un periodo de gran trascendencia para tu futuro 
                        personal y profesional.
                    </Text>

                    <Text>
                        En Preparatoria estamos muy contentos que formes parte de nuestra familia Anáhuac, 
                        trabajando juntos podemos ayudarte a adquirir las herramientas que te permitirán 
                        tener una mejor y más amplia visión del mundo que te rodea, además acceder a un 
                        futuro con mejores oportunidades.
                    </Text>

                    <Text>
                        ¡Nos vemos pronto!
                    </Text>
                </View>
            </Page>
        </Document>
    )
}
