
import DiffMatchPatch from 'diff-match-patch';

export function generateDiff(oldHTML: string, newHTML: string): string {
    const dmp = new DiffMatchPatch();

    const diff = dmp.diff_main(oldHTML, newHTML);

    dmp.diff_cleanupEfficiency(diff);

    const patchList = dmp.patch_make(oldHTML, diff);
    return dmp.patch_toText(patchList);
}