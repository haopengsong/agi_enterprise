import * as React from 'react';

import { Box, Button, IconButton, Tooltip } from '@mui/joy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';

import { KeyStroke } from '~/common/components/KeyStroke';


const pasteClipboardLegend =
  <Box sx={{ px: 1, py: 0.75, lineHeight: '1.5rem' }}>
    <b>粘贴板 📚</b><br />
    自动转换格式<br />
    <KeyStroke combo='Ctrl + Shift + V' sx={{ mt: 1, mb: 0.5 }} />
  </Box>;


export const ButtonAttachClipboardMemo = React.memo(ButtonAttachClipboard);

function ButtonAttachClipboard(props: { isMobile?: boolean, onClick: () => void }) {
  return props.isMobile ? (
    <IconButton onClick={props.onClick}>
      <ContentPasteGoIcon />
    </IconButton>
  ) : (
    <Tooltip disableInteractive variant='solid' placement='top-start' title={pasteClipboardLegend}>
      <Button fullWidth variant='plain' color='neutral' startDecorator={<ContentPasteGoIcon />} onClick={props.onClick}
              sx={{ justifyContent: 'flex-start' }}>
                粘贴
      </Button>
    </Tooltip>
  );
}