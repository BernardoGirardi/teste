import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, RefreshControl } from "react-native";
import { api } from "../services/api";
import PedidoCard from "../components/PedidoCard";

export default function Home() {
  const [pedidos, setPedidos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function carregarPedidos() {
    try {
      const { data } = await api.get("/comandas");
      setPedidos(data);
    } catch (err) {
      console.log("Erro ao buscar comandas:", err);
    }
  }

  useEffect(() => {
    carregarPedidos();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await carregarPedidos();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comandas Abertas</Text>

      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => <PedidoCard pedido={item} />}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma comanda aberta</Text>}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: "#f5f5f5" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  empty: { marginTop: 30, textAlign: "center", fontSize: 16, color: "#777" },
});
