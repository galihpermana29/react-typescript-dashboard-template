import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './shared/models/router-model.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';

import './index.scss';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>
);
