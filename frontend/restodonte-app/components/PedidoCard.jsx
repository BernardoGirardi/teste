import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PedidoCard({ pedido }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Mesa {pedido?.mesa ?? "—"}</Text>
      <Text style={styles.subtitle}>{pedido?.itens?.length ?? 0} itens</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
    elevation: 3,
  },
  title: { fontSize: 20, fontWeight: "bold" },
  subtitle: { fontSize: 14, color: "#666", marginTop: 4 },
});
