/** @jsxImportSource react */
import { qwikify$ } from '@builder.io/qwik-react';
import Switch from '@mui/material/Switch';
import { TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';

export const QwikTextField = qwikify$(TextField, { eagerness: 'hover' });
