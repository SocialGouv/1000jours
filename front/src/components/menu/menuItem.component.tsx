import * as React from "react";
import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

import {
  Colors,
  FontNames,
  FontWeight,
  getFontFamilyName,
  Margins,
  Paddings,
  Sizes,
} from "../../styles";
import type { MenuItem, MenuSubItem } from "../../types";
import { Icomoon, View } from "../baseComponents";

interface Props {
  accordionItem: MenuItem;
  onListItemPressed: (menuItem: MenuItem | MenuSubItem) => () => void;
}

const MenuAccordionItem: React.FC<Props> = ({
  accordionItem,
  onListItemPressed,
}) => {
  const [showInformation, setShowInformation] = useState(false);

  const updateShowInformation = useCallback(() => {
    setShowInformation(!showInformation);
  }, [showInformation]);

  return (
    <>
      <ListItem.Accordion
        accessibilityLabel={accordionItem.title}
        accessibilityRole={accordionItem.accessibilityRole ?? "button"}
        accessibilityState={{
          expanded: showInformation,
        }}
        content={
          <>
            {accordionItem.icon && (
              <View style={styles.menuItemIcon}>
                <Icomoon
                  name={accordionItem.icon}
                  size={Sizes.xl}
                  color={Colors.primaryBlueDark}
                />
              </View>
            )}
            <ListItem.Content>
              <ListItem.Title
                style={[styles.menuItemTitle, { marginStart: Margins.default }]}
                allowFontScaling={false}
              >
                {accordionItem.title}
              </ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={showInformation}
        onPress={updateShowInformation}
      >
        {accordionItem.subItems?.map((subItem, subIndex) => (
          <ListItem key={`sub${subIndex}`} onPress={onListItemPressed(subItem)}>
            <ListItem.Content>
              <ListItem.Title
                style={styles.menuItemSubTitle}
                allowFontScaling={false}
              >
                {subItem.title}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </ListItem.Accordion>
    </>
  );
};

const styles = StyleSheet.create({
  menuItemIcon: {
    backgroundColor: "transparent",
    paddingLeft: Paddings.default,
    paddingRight: Paddings.smallest,
  },
  menuItemSubTitle: {
    color: Colors.primaryBlueDark,
    fontFamily: getFontFamilyName(FontNames.avenir, FontWeight.medium),
    paddingLeft: Paddings.subItemMenu,
  },
  menuItemTitle: {
    color: Colors.primaryBlueDark,
    fontFamily: getFontFamilyName(FontNames.avenir, FontWeight.medium),
  },
  title: {
    color: Colors.primaryBlueDark,
    fontFamily: getFontFamilyName(FontNames.avenir, FontWeight.black),
    paddingHorizontal: Paddings.default,
    textTransform: "uppercase",
  },
});

export default MenuAccordionItem;
