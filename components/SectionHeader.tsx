import { Text, TouchableOpacity, View } from "react-native";

export default function SectionHeader({ title, subtitle, onSeeAll }: { title: string; subtitle?: string; onSeeAll: () => void }) {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
            <Text style={{ fontSize: 24, fontWeight: '500' }}>{title}</Text>
            {subtitle && <Text style={{ fontSize: 14, color: '#7C7C7C' }}>{subtitle}</Text>}
            <TouchableOpacity onPress={onSeeAll}>
                <Text style={{ fontSize: 16, color: '#53B175' }}>See All</Text>
            </TouchableOpacity>
        </View>
    )
}
