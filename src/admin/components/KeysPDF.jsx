import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer'

export const KeysPDF = ({ keys }) => {
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
            padding: 20,
        }
    });
    
    return (
        <Document>
            <Page style={{ fontSize: 16, ...styles.globalFont }}>
                <View 
                    style={{
                        display: 'grid',
                        flexDirection: 'row', 
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                    }}>
                        {
                            keys.map((key, index) => (
                                <View key={ index } style={{ padding: 15 }}>
                                    <Text>{ key.key }</Text>
                                </View>
                            ))
                        }
                </View>
            </Page>
        </Document>
    )
}
