import { FlatList, ScrollView, Text, View } from "react-native";

export interface Column<T> {
    key: string;
    title: string;
    render: (item: T) => React.ReactNode;
    flex?: number;
    horizontal?:boolean
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    move?:boolean
}

export function DataTable<T>({
    data,
    columns,
    move
}: DataTableProps<T>) {

    return (
        <ScrollView horizontal={move}>
            <View className="rounded-xl overflow-hidden">

                <View className="flex-row bg-gray-800 py-3 px-4">
                    {columns.map((column) => (
                        <Text
                            key={column.key}
                            style={{ flex: column.flex ?? 1 }}
                            className="text-white font-bold px-2"
                        >
                            {column.title}
                        </Text>
                    ))}
                </View>

                <FlatList
                    scrollEnabled={false}
                    data={data}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View
                            className={`flex-row py-3 px-5 ${index % 2 === 0
                                ? "bg-gray-100"
                                : "bg-white"
                                }`}
                        >
                            {columns.map((column) => (
                                <View
                                    key={column.key}
                                    style={{ flex: column.flex ?? 1,paddingHorizontal:3 }}
                                >
                                    {column.render(item)}
                                </View>
                            ))}
                        </View>
                    )}
                />
            </View>
        </ScrollView>
    );
}