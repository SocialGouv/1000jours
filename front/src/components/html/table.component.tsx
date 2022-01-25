import * as React from "react";
import { StyleSheet, View } from "react-native";

import { Labels } from "../../constants";
import { Colors, FontWeight } from "../../styles";
import type { TableData } from "../../types";
import { SecondaryText } from "../baseComponents";
import Caption from "./caption.component";

interface Props {
  tableData: TableData;
}

const Table: React.FC<Props> = (props) => (
  <>
    <Caption>
      {Labels.accessibility.array} : {props.tableData.caption}
    </Caption>

    <View style={styles.grid}>
      <View style={styles.row}>
        {props.tableData.head.map((rowData, index) => (
          <View style={[styles.col, styles.colHead]} key={index}>
            <SecondaryText style={styles.bold}>{rowData}</SecondaryText>
          </View>
        ))}
      </View>
      {props.tableData.data.map((rowData, indexRow) => (
        <View style={[styles.row]} key={indexRow}>
          {rowData.map((data, indexData) => (
            <View style={styles.col} key={indexData}>
              <SecondaryText>{data}</SecondaryText>
            </View>
          ))}
        </View>
      ))}
    </View>
  </>
);

const styles = StyleSheet.create({
  bold: {
    fontWeight: FontWeight.bold,
  },
  col: {
    borderWidth: 1,
    flex: 1,
    padding: 5,
  },
  colHead: {
    alignItems: "center",
    backgroundColor: Colors.primaryBlueLight,
  },
  grid: {
    borderWidth: 1,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
});

export default Table;
