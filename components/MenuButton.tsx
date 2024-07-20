import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View, Modal } from "react-native";

interface MenuButtonProps {
  icon: string;
  renderMenu: ({ closeMenu }: { closeMenu: () => void }) => React.ReactNode;
}

const MenuButton: React.FC<MenuButtonProps> = ({ icon, renderMenu }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => {
    setMenuVisible(true);
    console.log("Menu opened");
  };

  const closeMenu = () => {
    setMenuVisible(false);
    console.log("Menu closed");
  };

  return (
    <View>
      <TouchableOpacity onPress={openMenu} style={styles.button}>
        <Text style={styles.plus}>{icon}</Text>
      </TouchableOpacity>
      {menuVisible && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={menuVisible}
          onRequestClose={closeMenu}
        >
          <TouchableOpacity style={styles.overlay} onPress={closeMenu}>
            <View style={styles.menu}>{renderMenu({ closeMenu })}</View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
  },
  plus: {
    fontSize: 24,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menu: {
    width: 200,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
});

export default MenuButton;
