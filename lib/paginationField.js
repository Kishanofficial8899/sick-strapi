import { mergeDeep } from "@apollo/client/utilities";
import { PAGINATION_QUERY } from "../components/Pagination";

export default function paginationField() {
    return {
        keyArgs:false,
        read(existing=[],{ args,cache }) {
            const { limit, start } = args;
            
            const data = cache.readQuery({ query:PAGINATION_QUERY });
            const count = data?.productsConnection?.aggregate?.count;
            const page = start / limit + 1;
            const pages = Math.ceil(count / limit);
            const items = existing.slice(limit, limit + start).filter((x) => x);
            if (items.length && items.length !== start && page === pages) {
                return items;
            }
            if (items.length && items.length !== start && page === pages) {
                return items;
            }
            if (items.length !== start) {
                return false;
            }
            if (items.length) {
                console.log(
                    `There are ${items.length} items in the cache! Gonna send them to apollo`
                );
                return items;
            }
            return false;
        },
        merge(existing, incoming, { args }) {
            const { limit, start } = args;
            console.log(limit)
            console.log("existing", existing)
            console.log(`MErging items from the network ${incoming.length}`);
            const merged = existing ? existing.slice(0) : [];
            for (let i = limit; i < limit + incoming.length; ++i) {
                merged[i] = incoming[i - limit];
            }
            // Finally we return the merged items from the cache,
            return merged;
        }
    }
}