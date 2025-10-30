# Remove large files from git history
git filter-branch --force --index-filter `
  "git rm --cached --ignore-unmatch WindsurfUserSetup-x64-1.12.27.exe ccsetup_online_setup.exe certificateOfIEC.pdf" `
  --prune-empty --tag-name-filter cat -- --all

# Force garbage collection
git for-each-ref --format="delete %(refname)" refs/original | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now --aggressive

Write-Host "Large files removed from history. Now force push with: git push origin main --force"
