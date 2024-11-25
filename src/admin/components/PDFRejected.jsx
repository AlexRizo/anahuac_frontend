import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { format } from 'date-fns'
import { localCustom } from '../helpers'
import { useEffect, useState } from 'react';

export const PDFRejected = (
    {
        aspirant,
        lecturaScore,
        matematicasScore,
        pensamientoScore,
        date,
        sex,
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
        globalFont: {
            fontFamily: 'Inter',
        }
    });
    
    return (
        <Document>
            <Page style={{ fontSize: 12, ...styles.globalFont }}>
                <View>
                    <Image src={'/img/pdf/header-p2.jpg'} style={{ width: '100%', height: 'auto' }} />
                </View>
                <View style={{ paddingHorizontal: 40 }}>
                    <Text style={{ fontSize: 20, fontWeight: 700, textAlign: 'center', marginVertical: 20 }}>RESULTADOS DE EXAMEN DE ADMISIÓN</Text>
                    <Text>
                        Nombre { sex === 'MASCULINO' ? 'del alumno' : 'de la alumna' }: <Text style={{ fontWeight: 700 }}>{ aspirant }</Text>
                    </Text>
                    <Text>
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
                <View style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: 20,
                    textAlign: 'center',
                    fontSize: 12,
                    position: 'absolute',
                    bottom: 80,
                }}>
                    <View style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        <Text>
                            Colima, Col. a <Text style={{ fontWeight: 600, fontSize: 12 }}>{ format(new Date(), "dd 'de' MMMM 'del' y", { locale: localCustom }) }</Text>
                        </Text>
                        <Text>
                            Atentamente
                        </Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        <Text>Imelda Ivonne Ávalos Vizcaíno</Text>
                        <Text>Directora Académica</Text>
                    </View>
                </View>
                <Image src={'/img/pdf/footer_left.png'} style={{ position: 'absolute', width: 215, left: 0, bottom: 0, zIndex: 2 }} />
                <Image src={'/img/pdf/footer_right.png'} style={{ position: 'absolute', width: 215, right: 0, bottom: 0, zIndex: 2 }} />
            </Page>
        </Document>
    )
}
