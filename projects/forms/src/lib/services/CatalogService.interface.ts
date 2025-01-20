import { Observable } from 'rxjs';
import { Item } from '../Models/Item.model';

export default interface CatalogServiceInterface {
  getItems(catalogId: String): Observable<Item[]>;
  getItemsByParent(catalog: string, parentId: string): Observable<Item[]>;
  getItem(id:String):Observable<Item>;
}
