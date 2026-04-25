import { Card, CardContent, Stack, Typography } from '@mui/material';

type StatCardProps = {
  label: string;
  value: string;
  helper: string;
};

export function StatCard({ label, value, helper }: StatCardProps) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="overline" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="h5">{value}</Typography>
          <Typography color="text.secondary">{helper}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
