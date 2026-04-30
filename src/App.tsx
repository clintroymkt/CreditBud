/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';
import { FinaScoreView } from './pages/FinaScore';
import { DataSources } from './pages/DataSources';

type Tab = 'dashboard' | 'transactions' | 'finascore' | 'sources';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'dashboard' && <Dashboard onNavigate={setActiveTab} />}
      {activeTab === 'transactions' && <Transactions />}
      {activeTab === 'finascore' && <FinaScoreView />}
      {activeTab === 'sources' && <DataSources />}
    </Layout>
  );
}
