# 3D assets

The hero background uses a **small procedural mesh** (closed-laptop silhouette) defined in code in `src/components/HeroBackground3D.tsx` — **no bundled `.glb` / `.gltf` file** here.

That keeps the repo lightweight and avoids shipping a third-party model without a tracked license on disk.

If you later add a model file to this folder:

- Use only assets with an explicit **CC0**, **MIT**, or **Apache-2.0** (or equivalent) license and keep a copy of the license text next to the file.
- Prefer low-poly GLBs under **~500KB**, draco-compressed when possible.
- Update `HeroBackground3D` to load via `useGLTF('/models/your-model.glb')` and remove or simplify the procedural group.
