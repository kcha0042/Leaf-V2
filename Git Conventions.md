# Git Conventions

## Branches

`main` is our stable branch.

`develop` is branched off main to be then branched off again (feature and issue branches). Branches then merge back into `develop`. When develop is stable enough we can merge it back into `main`.

**Only branch off develop.**

**When you are done, DON'T merge it yourself, instead create a pull request (`develop` <= `your-branch`) and put Andre Pham as a reviewer.**

## Branch Names

Branch names follow `kebab-case`.

If your branch is created to resolve a specific bug, for instance issue #3, you should call the branch name `issues/3`.

Generally, make your branches somewhat descriptive to what you're working on. If you're adding object serialisation, call it `object-serialisation`. If you're adding a missing button to a screen in the admin UI, call it `admin-missing-button`.

When Andre merges your pull request, he'll delete your branch. That way if if there's ever another, say, another missing button in the admin UI, it's totally fine to create ANOTHER branch called `admin-missing-button`. (And yes, I checked, once you've deleted a branch it's fine to create a new branch with the deleted branch's name).