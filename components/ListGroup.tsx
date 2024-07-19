import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
interface ListGroupProps<T> {
  items: T[];
  heading: string;
  onSelectItem: (item: T) => void;
  renderItem: (item: T) => React.ReactNode;
}

function ListGroup<T>({
  items,
  heading,
  onSelectItem,
  renderItem,
}: ListGroupProps<T>) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <View>
      <Text style={styles.heading}>{heading}</Text>
      {items.length === 0 && <Text>No items found</Text>}
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.item, selectedIndex === index && styles.selectedItem]}
          onPress={() => {
            setSelectedIndex(index);
            onSelectItem(item);
          }}
        >
          {renderItem(item)}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
  },
  selectedItem: {
    backgroundColor: "#cce7ff",
  },
});

export default ListGroup;
