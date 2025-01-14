import React, { useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    Image
} from "react-native"
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS, SIZES, FONTS, icons, images, Profiles, styles, EntriesList } from "../constants"

import app from "../src/config/firebase";
import { getFirestore, collection, getDocs, doc} from "firebase/firestore";
import { getAuth} from "firebase/auth"

const Reports = () => {
    const firestore = getFirestore();
    const auth = getAuth();

    const [locations, setLocations] = React.useState([])

    useEffect(() => {
        getDocumentos();
    })

    const getDocumentos = async () => {
        const querySnapshot = await getDocs(collection(firestore, "users", auth.currentUser.uid, "Lançamentos"));
        let d = [];
        querySnapshot.forEach((doc) => {
            const [valor, tipo] = doc.data()
            d.push({
                id: doc.id,
                valor,
                tipo,
            });
        });
        setLocations(d);
    }


    function RenderMovements({ data }) {
        if (data.type == 1)
            return (
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    marginTop: SIZES.padding * 1.5,
                    marginStart: SIZES.padding * 2,
                    alignItems: 'stretch',
                    justifyContent: 'flex-start',
                }}
                    onPress={() => console.log("Abrir lançamento id: " + data.id)}
                >
                    <Text style={styles.income}>   {data.id}. {data.label} {data.currency} {data.value}   </Text>
                </TouchableOpacity>
            )
        else
            return (
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    marginTop: SIZES.padding * 1.5,
                    marginStart: SIZES.padding * 2,
                    alignItems: 'stretch',
                    justifyContent: 'flex-start',
                }}
                    onPress={() => console.log("Abrir lançamento id: " + data.id)}
                >
                    <Text style={styles.outcome}>   {data.id}. {data.label} {data.currency} {data.value}   </Text>
                </TouchableOpacity>
            )
    }

    function renderGraph() {
        return (
            <View style={{
                alignItems: 'center',
                justifyContent: 'center'
            }}>

                <Image
                    source={icons.wallet}
                    resizeMode="contain"
                    style={{
                        width: 200,
                        height: 200,
                        tintColor: COLORS.white,
                    }}
                />
            </View>
        )
    }

    function renderHeader() {
        return (
            <View style={styles.headerView}>
                <Text style={{
                    color: COLORS.white, ...FONTS.largeTitle
                }}>
                    Estatísticas e Relatórios
                </Text>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
        >
            <LinearGradient
                colors={["#000", "#222"]}
                style={{ flex: 1 }}
            >
                <View style={{ marginHorizontal: 2 }}>
                    {renderHeader()}
                    {renderGraph()}

                    <Text style={{
                        color: COLORS.white, ...FONTS.title, marginStart: SIZES.padding * 2
                    }}>
                        Relatórios:
                    </Text>
                    <FlatList style={styles.list}
                        data={locations}
                        keyExtractor={(item) => String(item.id)}
                        showsVerticalScrollIndicator={true}
                        renderItem={({ item }) => {
                            <Pressable>
                                <View>
                                    <Text>{item.valor}</Text>
                                    <Text>{item.tipo}</Text>
                                </View>
                            </Pressable>
                        }}
                    />
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

export default Reports;
