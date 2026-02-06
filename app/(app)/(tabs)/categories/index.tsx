import { Redirect } from 'expo-router';
import { categories } from '../../../../data/dummyData';

export default function Categories() {
  // Redirect to the first category (Grocery) immediately
  // This gives the "Instamart" feel where you land on the split view directly.
  const firstCategory = categories[0];
  return <Redirect href={`/categories/category/${firstCategory.id}` as any} />;
}
