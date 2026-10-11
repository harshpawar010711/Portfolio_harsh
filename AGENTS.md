<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Portfolio architecture
- Keep the requested anchor-based portfolio as a single index route; its sections form one continuous editorial experience.
- Keep sample project data and video URL normalization in a browser-safe portfolio module; shared player behavior stays consistent across the reel, details and hub.
- Use Radix-backed Sheet for project details; it provides focus trapping, Escape dismissal and responsive slide directions.
