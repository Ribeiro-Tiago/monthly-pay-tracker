import React from "react";
import PickerSelect, { PickerStyle, Item } from "react-native-picker-select";

interface Props<T> {
  onClose?: () => void; // IOS
  onChange: (value: T, index: number) => void;
  data: Item[];
  value: T;
}

export default function <T>({ onClose, onChange, data, value }: Props<T>) {
  return (
    <PickerSelect
      onClose={onClose}
      onValueChange={(val) => onChange(val, 0)}
      items={data}
      style={localePickerStyles}
      placeholder={{}}
      value={value}
      useNativeAndroidPickerStyle={true}
    />
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
    marginLeft: 10,
    paddingVertical: 10,
  },
  chevronDown: {
    display: "none",
  },
  chevronUp: {
    display: "none",
  },
};
