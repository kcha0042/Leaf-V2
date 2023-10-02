class FuzzySearchUtil {
    static cleanupQuery(searchQuery: string): string {
        return searchQuery.replace(/\s/g, "");
    }

    static calculateLevenshteinDistance(source: string, target: string): number {
        const sourceLength = source.length;
        const targetLength = target.length;

        const distanceMatrix = Array.from({ length: sourceLength + 1 }, (_, row) => Array(targetLength + 1).fill(row));

        for (let columnIndex = 1; columnIndex <= targetLength; columnIndex++) {
            distanceMatrix[0][columnIndex] = columnIndex;
        }

        for (let rowIndex = 1; rowIndex <= sourceLength; rowIndex++) {
            for (let columnIndex = 1; columnIndex <= targetLength; columnIndex++) {
                const cost = source[rowIndex - 1] === target[columnIndex - 1] ? 0 : 1;
                distanceMatrix[rowIndex][columnIndex] = Math.min(
                    distanceMatrix[rowIndex - 1][columnIndex] + 1,
                    distanceMatrix[rowIndex][columnIndex - 1] + 1,
                    distanceMatrix[rowIndex - 1][columnIndex - 1] + cost,
                );
            }
        }

        return distanceMatrix[sourceLength][targetLength];
    }

    static isFuzzyMatch(query: string, data: any, dataToString: (data: any) => string, localMaxDistance: number): boolean {
        const calculateMatch = FuzzySearchUtil.calculateLevenshteinDistance(query, dataToString(data));
        return calculateMatch <= localMaxDistance;
    }

    static handleSearch(searchQuery: string, data: any[], dataToString: (data: any) => string, maxDistance: number): any[] {
        const cleanQuery = FuzzySearchUtil.cleanupQuery(searchQuery);
        let filtered = data.filter((item) =>
            FuzzySearchUtil.cleanupQuery(dataToString(item)).toLowerCase().includes(cleanQuery.toLowerCase()),
        );
        if (filtered.length == 0) {
            //if doesn't match, do a fuzzy search (Levenshtein Algorithm)
            filtered = data.filter((item) => FuzzySearchUtil.isFuzzyMatch(cleanQuery, item, dataToString, maxDistance));
        }
        return filtered;
    }
}

export default FuzzySearchUtil;