import Tooltip from '@mui/joy/Tooltip';
import IconButton from '@mui/joy/IconButton';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

interface QuestionTooltipProps {
  question: string;
  context: string;
}

export default function QuestionTooltip({ context }: QuestionTooltipProps) {
  return (
    <Tooltip title={context} arrow placement="top" variant="outlined">
      <IconButton size="sm" variant="outlined" color="neutral" sx={{ ml: 0.5, verticalAlign: 'text-bottom', padding: 0.1}}>
        <InfoOutlined fontSize="small"/>
      </IconButton>
    </Tooltip>
  );
}