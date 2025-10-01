import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { format } from 'date-fns'
import { localCustom } from '../helpers'
import { useEffect, useState } from 'react';

export const PDFPrepaRejected = (
    {
        aspirant = '',
        lecturaScore = 0,
        matematicasScore = 0,
        pensamientoScore = 0,
        date,
        sex,
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
        globalFont: {
            fontFamily: 'Inter',
        }
    });
    
    return (
        <Document>
            <Page style={{ fontSize: 10, ...styles.globalFont }} size="LETTER">
                <View style={{ paddingHorizontal: 40, marginTop: 140 }}>
                    <Text style={{ fontSize: 18, fontWeight: 700, textAlign: 'center', marginBottom: 20 }}>RESULTADOS DE EXAMEN DE ADMISIÓN</Text>
                    <Text>
                        Nombre { sex === 'MASCULINO' ? 'del alumno' : 'de la alumna' }: <Text style={{ fontWeight: 700 }}>{ aspirant }</Text>
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                        Fecha de aplicación: <Text style={{ fontWeight: 700 }}>{ format(date, "dd 'de' MMMM 'del' y", { locale: localCustom }) }</Text>
                    </Text>
                    <View style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 20, marginBottom: 20 }}>
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
                            <Text style={{ width: 100, fontWeight: 700 }}>Total</Text>
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
                            fontSize: 11, 
                            paddingVertical: 5
                        }}>
                            <Text style={{ width: 100 }}>{ lecturaScore }</Text>
                            <Text style={{ width: 100 }}>{ matematicasScore }</Text>
                            <Text style={{ width: 100 }}>{ pensamientoScore }</Text>
                            <Text style={{ width: 100, fontSize: 12 }}>{ totalScore }</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 15,
                    fontSize: 10,
                    position: 'absolute',
                    bottom: 110,
                    left: "50%",
                    transform: 'translateX(-100%)',
                }}>
                    <View style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: "center" }}>
                        <Text>
                            Colima, Col. a <Text style={{ fontWeight: 600 }}>{ format(new Date(), "dd 'de' MMMM 'del' y", { locale: localCustom }) }</Text>
                        </Text>
                        <Text>
                            Atentamente
                        </Text>
                    </View>
                    <Image src={'/img/pdf/firma-prepa.png'} style={{ width: 200 }} />
                    <View style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: "center" }}>
                        <Text>Imelda Ivonne Ávalos Vizcaíno</Text>
                        <Text>Directora Académica</Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}
