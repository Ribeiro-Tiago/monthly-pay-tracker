import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import PickerSelect, { PickerStyle } from "react-native-picker-select";
import Icon from "react-native-vector-icons/Ionicons";

import { TopBar, Webview } from "../../components";
import { i18nContext } from "../../contexts/i18n";
import { SupportedLocales } from "../../types/context";
import locales, { metadata as localePickerData } from "../../i18n";
import { updateLocale } from "../../services/storage";
import pkgJson from "../../../package.json";

interface Props {}

const PDF_ASSET_URL = "https://tiago-ribeiro.com/debtr";

export default function Settings({}: Props) {
  const { i18n, setI18n } = useContext(i18nContext);
  const [locale, setLocale] = useState<SupportedLocales>(i18n._locale);
  const [webviewUri, setWebviewUri] = useState("");

  const onPickerClose = () => {
    setI18n(locales[locale]);
    updateLocale(locale);
  };

  const renderSectionTitle = (title: string) => {
    return <Text style={styles.sectionTitle}>{title}</Text>;
  };

  const renderLanguage = () => {
    return (
      <>
        {renderSectionTitle(i18n.langauge)}

        <PickerSelect
          onClose={onPickerClose}
          onValueChange={setLocale}
          items={localePickerData.map((l) => ({
            key: l.key,
            value: l.key,
            label: l.name,
          }))}
          style={localePickerStyles}
          placeholder={{}}
          value={locale}
          useNativeAndroidPickerStyle={true}
        />
      </>
    );
  };

  const onPDFClick = (file: string) => {
    setWebviewUri(`${PDF_ASSET_URL}/${file}`);
  };

  const renderAbout = () => {
    const render = () => {};

    return (
      <>
        {renderSectionTitle(i18n.about)}

        <View style={styles.group}>
          <Text style={styles.groupText}>{i18n.version}</Text>
          <Text style={styles.groupText}>{pkgJson.version}</Text>
        </View>

        <TouchableWithoutFeedback onPress={() => onPDFClick("pp.pdf")}>
          <View style={styles.group}>
            <Text style={styles.groupText}>{i18n.privacyPolicy}</Text>
            <Icon name="ios-arrow-forward" size={24} />
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => onPDFClick("tos.pdf")}>
          <View style={styles.group}>
            <Text style={styles.groupText}>{i18n.tos}</Text>
            <Icon name="ios-arrow-forward" size={24} />
          </View>
        </TouchableWithoutFeedback>
      </>
    );
  };

  if (!!webviewUri) {
    return <Webview uri={webviewUri} onClose={() => setWebviewUri("")} />;
  }

  return (
    <>
      <TopBar title={i18n.settings} />

      <ScrollView bounces={false}>
        {renderLanguage()}
        {renderAbout()}
      </ScrollView>
    </>
  );
}

const localePickerStyles: PickerStyle = {
  placeholder: {
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputIOS: {
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputAndroid: {
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  chevronDown: {
    display: "none",
  },
  chevronUp: {
    display: "none",
  },
};
const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#581c0c",
  },
  sectionTitle: {
    fontSize: 16,
    backgroundColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  group: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  groupText: {
    fontSize: 18,
  },
});
