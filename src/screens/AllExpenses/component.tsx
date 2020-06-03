import React from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { TopBar, List, ListItem } from '../../components';
import { Item, Month } from '../../types';

interface Props {
  items: Item[];
  updateCurrent: (item?: Item) => void;
}

export default function AllExpenses({ items, updateCurrent }: Props) {
  const navigation = useNavigation();

  const goToForm = (item?: Item) => {
    updateCurrent(item);
    navigation.navigate('ExpenseForm');
  };

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyContainer}>
        <TouchableWithoutFeedback onPress={() => goToForm()}>
          <View style={styles.createExpenseContainer}>
            <Text style={styles.createExpenseText}>
              Create your first expense
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const renderMonths = (months: Month[]) => {
    if (!months.length || months.length === 12) {
      return <Text style={styles.tag}>Happens every month</Text>;
    }

    return months.map((m) => (
      <Text key={m.id} style={styles.tag}>
        {m.label}
      </Text>
    ));
  };

  const renderListItem = ({ item, index }) => {
    return (
      <ListItem
        item={item}
        iconName="ios-trash"
        onPress={() => goToForm(item)}
        isEven={index % 2 === 0}
        renderTags={({ months }) => (
          <View style={styles.tags}>{renderMonths(months)}</View>
        )}
      />
    );
  };

  const renderHeaderButton = () => {
    if (items.length) {
      return (
        <Text onPress={() => goToForm()} style={styles.button}>
          Create
        </Text>
      );
    }
  };

  return (
    <View style={styles.container}>
      <TopBar>
        <Text style={styles.title}>All monthly expenses</Text>
        {renderHeaderButton()}
      </TopBar>

      <List
        data={items}
        renderEmptyList={renderEmptyList}
        renderListItem={renderListItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#581c0c',
  },
  button: {
    fontSize: 20,
    color: '#581c0c',
  },
  tags: {
    display: 'flex',
    flexDirection: 'row',
  },
  tag: {
    fontSize: 12,
    marginRight: 5,
  },
  emptyContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createExpenseContainer: {
    borderRadius: 10,
    backgroundColor: '#f1e3cb',
    padding: 10,
    borderColor: '#581c0c',
    borderWidth: 1,
  },
  createExpenseText: {
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 40,
    color: '#581c0c',
  },
});
