!macro customRemoveFiles
  # 卸载才会删除所有文件
  ${ifNot} ${isUpdated}
    RMDir /r "$INSTDIR"
  ${endif}
!macroend


