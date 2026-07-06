// // // // // import { useState } from 'react';
// // // // // import { useNavigate } from 'react-router-dom';
// // // // // import { Search, AlertCircle, Image as ImageIcon, RefreshCw, FileText, Megaphone } from 'lucide-react';
// // // // // import { searchPublicItems } from '../../api/items';
// // // // // import { useAuth } from '../../context/AuthContext';
// // // // // import Button from '../../components/shared/Button';

// // // // // const REGIONS = [
// // // // //   'ARUSHA','DAR_ES_SALAAM','DODOMA','GEITA','IRINGA','KAGERA','KATAVI',
// // // // //   'KIGOMA','KILIMANJARO','LINDI','MANYARA','MARA','MBEYA','MOROGORO',
// // // // //   'MTWARA','MWANZA','NJOMBE','PWANI','RUKWA','RUVUMA','SHINYANGA',
// // // // //   'SIMIYU','SINGIDA','TABORA','TANGA','UNGUJA_KASKAZINI','UNGUJA_KUSINI',
// // // // //   'UNGUJA_MJINI_MAGHARIBI','PEMBA',
// // // // // ];

// // // // // function SkeletonCard() {
// // // // //   return (
// // // // //     <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden shadow-sm">
// // // // //       <div className="h-44 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse" />
// // // // //       <div className="p-4">
// // // // //         <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // function ItemCard({ item }) {
// // // // //   const [imgError, setImgError] = useState(false);
// // // // //   return (
// // // // //     <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
// // // // //       <div className="h-44 bg-[#f8fafc] flex items-center justify-center overflow-hidden">
// // // // //         {item.previewImage && !imgError ? (
// // // // //           <img
// // // // //             src={item.previewImage}
// // // // //             alt={item.itemName}
// // // // //             className="w-full h-full object-cover"
// // // // //             onError={() => setImgError(true)}
// // // // //           />
// // // // //         ) : (
// // // // //           <div className="flex flex-col items-center gap-1 text-gray-300">
// // // // //             <ImageIcon size={36} strokeWidth={1.5} />
// // // // //             <span className="text-xs text-gray-400">No Image</span>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //       <div className="p-4">
// // // // //         <h3 className="text-sm font-semibold text-[#0f172a] truncate">
// // // // //           {item.itemName || 'Unnamed Item'}
// // // // //         </h3>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default function SearchItems() {
// // // // //   const navigate = useNavigate();
// // // // //   const { user } = useAuth();
// // // // //   const stored = JSON.parse(localStorage.getItem('user') || '{}');
// // // // //   const userName = stored.name || user?.name || 'User';

// // // // //   const [region, setRegion] = useState('');
// // // // //   const [items, setItems] = useState([]);
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [error, setError] = useState('');
// // // // //   const [searched, setSearched] = useState(false);

// // // // //   const handleSearch = async () => {
// // // // //     try {
// // // // //       setLoading(true);
// // // // //       setError('');
// // // // //       setSearched(true);
// // // // //       const result = await searchPublicItems({
// // // // //         region: region || undefined,
// // // // //         page: 0,
// // // // //         size: 10,
// // // // //       });
// // // // //       setItems(result.content ?? []);
// // // // //     } catch (err) {
// // // // //       console.error(err);
// // // // //       setError('Unable to load data. Please try again.');
// // // // //       setItems([]);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="min-h-screen bg-surface flex flex-col">
// // // // //       {/* Main content area with padding for fixed bottom bar */}
// // // // //       <div className="flex-1 pb-28"> {/* extra padding so content isn't hidden behind fixed bar */}
// // // // //         <div className="max-w-7xl mx-auto px-4 py-8">
// // // // //           {/* Top row: greeting + My Reports button */}
// // // // //           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
// // // // //             <h1 className="text-3xl font-bold tracking-tight text-[#0f172a]">
// // // // //               Hi, {userName}! Welcome to PataChako.
// // // // //             </h1>
// // // // //             <Button
// // // // //               variant="primary"
// // // // //               onClick={() => navigate('/owner/reports')}
// // // // //               className="self-start sm:self-auto"
// // // // //             >
// // // // //               <FileText size={18} className="mr-2" />
// // // // //               My Reports
// // // // //             </Button>
// // // // //           </div>

// // // // //           {/* Filter Bar */}
// // // // //           <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-sm mb-8">
// // // // //             <div className="flex flex-col sm:flex-row gap-3">
// // // // //               <div className="flex-1">
// // // // //                 <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
// // // // //                   Filter by Region
// // // // //                 </label>
// // // // //                 <select
// // // // //                   value={region}
// // // // //                   onChange={(e) => setRegion(e.target.value)}
// // // // //                   className="w-full px-4 py-2.5 rounded-xl border border-[#e2e8f0] focus:ring-2 focus:ring-[#1a56db]/20 focus:border-[#1a56db] outline-none bg-white text-gray-800 text-sm transition-all"
// // // // //                 >
// // // // //                   <option value="">All Regions</option>
// // // // //                   {REGIONS.map((r) => (
// // // // //                     <option key={r} value={r}>{r.replace(/_/g, ' ')}</option>
// // // // //                   ))}
// // // // //                 </select>
// // // // //               </div>
// // // // //               <div className="sm:self-end">
// // // // //                 <button
// // // // //                   onClick={handleSearch}
// // // // //                   disabled={loading}
// // // // //                   className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#1a56db] text-white font-semibold text-sm transition-all duration-200 hover:bg-[#1547c0] disabled:opacity-70 disabled:cursor-not-allowed"
// // // // //                   style={{ minWidth: 140 }}
// // // // //                 >
// // // // //                   {loading ? (
// // // // //                     <>
// // // // //                       <RefreshCw size={16} className="animate-spin" />
// // // // //                       Searching...
// // // // //                     </>
// // // // //                   ) : (
// // // // //                     <>
// // // // //                       <Search size={16} />
// // // // //                       Search
// // // // //                     </>
// // // // //                   )}
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* Error */}
// // // // //           {error && (
// // // // //             <div className="flex items-center gap-3 bg-rose-50 border border-rose-100 text-rose-700 px-5 py-4 rounded-xl mb-8 text-sm font-medium">
// // // // //               <AlertCircle size={18} className="shrink-0 text-rose-500" />
// // // // //               {error}
// // // // //             </div>
// // // // //           )}

// // // // //           {/* Skeleton */}
// // // // //           {loading && (
// // // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// // // // //               {Array.from({ length: 8 }).map((_, i) => (
// // // // //                 <SkeletonCard key={i} />
// // // // //               ))}
// // // // //             </div>
// // // // //           )}

// // // // //           {/* Results */}
// // // // //           {!loading && items.length > 0 && (
// // // // //             <>
// // // // //               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
// // // // //                 Found {items.length} item{items.length !== 1 ? 's' : ''}
// // // // //                 {region ? ` in ${region.replace(/_/g, ' ')}` : ' across all regions'}
// // // // //               </p>
// // // // //               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// // // // //                 {items.map((item) => (
// // // // //                   <ItemCard key={item.id} item={item} />
// // // // //                 ))}
// // // // //               </div>
// // // // //             </>
// // // // //           )}

// // // // //           {/* Empty */}
// // // // //           {!loading && searched && items.length === 0 && !error && (
// // // // //             <div className="flex flex-col items-center justify-center py-20 bg-gray-50 border border-dashed border-gray-200 rounded-2xl text-center px-4">
// // // // //               <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center mb-4 shadow-sm text-gray-300">
// // // // //                 <Search size={22} />
// // // // //               </div>
// // // // //               <h3 className="text-base font-bold text-[#0f172a] mb-1">No items found</h3>
// // // // //               <p className="text-gray-500 text-xs max-w-xs">Try a different region or check back later.</p>
// // // // //             </div>
// // // // //           )}

// // // // //           {/* Idle */}
// // // // //           {!loading && !searched && !error && (
// // // // //             <div className="flex flex-col items-center justify-center py-24 bg-white border border-gray-100 rounded-2xl shadow-sm text-center px-4">
// // // // //               <div className="w-14 h-14 rounded-full bg-blue-50 text-[#1a56db] flex items-center justify-center mb-4 border border-blue-100">
// // // // //                 <Search size={24} />
// // // // //               </div>
// // // // //               <h3 className="text-lg font-bold text-[#0f172a]">Find a reported item</h3>
// // // // //               <p className="text-gray-500 text-sm max-w-sm mt-1">
// // // // //                 Select a region and click Search to browse found items in your area.
// // // // //               </p>
// // // // //             </div>
// // // // //           )}
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Fixed bottom bar – always visible */}
// // // // //       <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-md border-t border-[#e2e8f0] shadow-lg py-4 px-4">
// // // // //         <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3">
// // // // //           <div className="flex items-center gap-2 text-[#0f172a] font-semibold text-sm sm:text-base">
// // // // //             <Megaphone size={20} className="text-[#1a56db]" />
// // // // //             <span>Lost something? Let our AI find it for you.</span>
// // // // //           </div>
// // // // //           <Button
// // // // //             variant="primary"
// // // // //             onClick={() => navigate('/owner/report')}
// // // // //             className="whitespace-nowrap"
// // // // //           >
// // // // //             <Megaphone size={18} className="mr-2" />
// // // // //             Report Lost Item
// // // // //           </Button>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // import { useState } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { Search, AlertCircle, Image as ImageIcon, RefreshCw, FileText, Megaphone } from 'lucide-react';
// // // // import { searchPublicItems } from '../../api/items';
// // // // import { useAuth } from '../../context/AuthContext';
// // // // import Button from '../../components/shared/Button';

// // // // const REGIONS = [
// // // //   'ARUSHA','DAR_ES_SALAAM','DODOMA','GEITA','IRINGA','KAGERA','KATAVI',
// // // //   'KIGOMA','KILIMANJARO','LINDI','MANYARA','MARA','MBEYA','MOROGORO',
// // // //   'MTWARA','MWANZA','NJOMBE','PWANI','RUKWA','RUVUMA','SHINYANGA',
// // // //   'SIMIYU','SINGIDA','TABORA','TANGA','UNGUJA_KASKAZINI','UNGUJA_KUSINI',
// // // //   'UNGUJA_MJINI_MAGHARIBI','PEMBA',
// // // // ];

// // // // function SkeletonCard() {
// // // //   return (
// // // //     <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden shadow-sm">
// // // //       <div className="h-44 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse" />
// // // //       <div className="p-4">
// // // //         <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // function ItemCard({ item }) {
// // // //   const [imgError, setImgError] = useState(false);
// // // //   return (
// // // //     <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
// // // //       <div className="h-44 bg-[#f8fafc] flex items-center justify-center overflow-hidden">
// // // //         {item.previewImage && !imgError ? (
// // // //           <img
// // // //             src={item.previewImage}
// // // //             alt={item.itemName}
// // // //             className="w-full h-full object-cover"
// // // //             onError={() => setImgError(true)}
// // // //           />
// // // //         ) : (
// // // //           <div className="flex flex-col items-center gap-1 text-gray-300">
// // // //             <ImageIcon size={36} strokeWidth={1.5} />
// // // //             <span className="text-xs text-gray-400">No Image</span>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //       <div className="p-4">
// // // //         <h3 className="text-sm font-semibold text-[#0f172a] truncate">
// // // //           {item.itemName || 'Unnamed Item'}
// // // //         </h3>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default function SearchItems() {
// // // //   const navigate = useNavigate();
// // // //   const { user } = useAuth();
// // // //   const stored = JSON.parse(localStorage.getItem('user') || '{}');
// // // //   const userName = stored.name || user?.name || 'User';

// // // //   const [region, setRegion] = useState('');
// // // //   const [items, setItems] = useState([]);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError] = useState('');
// // // //   const [searched, setSearched] = useState(false);

// // // //   const handleSearch = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       setError('');
// // // //       setSearched(true);
// // // //       const result = await searchPublicItems({
// // // //         region: region || undefined,
// // // //         page: 0,
// // // //         size: 10,
// // // //       });
// // // //       setItems(result.content ?? []);
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       setError('Unable to load data. Please try again.');
// // // //       setItems([]);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-surface flex flex-col">
// // // //       {/* Main content with padding for fixed bottom bar */}
// // // //       <div className="flex-1 pb-28">
// // // //         <div className="max-w-7xl mx-auto px-4 py-8">
// // // //           {/* Top row: greeting + My Reports button */}
// // // //           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
// // // //             <h1 className="text-3xl font-bold tracking-tight text-[#0f172a]">
// // // //               Hi, {userName}! Welcome to PataChako.
// // // //             </h1>
// // // //             <Button
// // // //               variant="primary"
// // // //               onClick={() => navigate('/owner/reports')}
// // // //               className="self-start sm:self-auto"
// // // //             >
// // // //               <FileText size={18} className="mr-2" />
// // // //               My Reports
// // // //             </Button>
// // // //           </div>

// // // //           {/* Filter Bar */}
// // // //           <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-sm mb-8">
// // // //             <div className="flex flex-col sm:flex-row gap-3">
// // // //               <div className="flex-1">
// // // //                 <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
// // // //                   Filter by Region
// // // //                 </label>
// // // //                 <select
// // // //                   value={region}
// // // //                   onChange={(e) => setRegion(e.target.value)}
// // // //                   className="w-full px-4 py-2.5 rounded-xl border border-[#e2e8f0] focus:ring-2 focus:ring-[#1a56db]/20 focus:border-[#1a56db] outline-none bg-white text-gray-800 text-sm transition-all"
// // // //                 >
// // // //                   <option value="">All Regions</option>
// // // //                   {REGIONS.map((r) => (
// // // //                     <option key={r} value={r}>{r.replace(/_/g, ' ')}</option>
// // // //                   ))}
// // // //                 </select>
// // // //               </div>
// // // //               <div className="sm:self-end">
// // // //                 <button
// // // //                   onClick={handleSearch}
// // // //                   disabled={loading}
// // // //                   className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#1a56db] text-white font-semibold text-sm transition-all duration-200 hover:bg-[#1547c0] disabled:opacity-70 disabled:cursor-not-allowed"
// // // //                   style={{ minWidth: 140 }}
// // // //                 >
// // // //                   {loading ? (
// // // //                     <>
// // // //                       <RefreshCw size={16} className="animate-spin" />
// // // //                       Searching...
// // // //                     </>
// // // //                   ) : (
// // // //                     <>
// // // //                       <Search size={16} />
// // // //                       Search
// // // //                     </>
// // // //                   )}
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           {/* Error */}
// // // //           {error && (
// // // //             <div className="flex items-center gap-3 bg-rose-50 border border-rose-100 text-rose-700 px-5 py-4 rounded-xl mb-8 text-sm font-medium">
// // // //               <AlertCircle size={18} className="shrink-0 text-rose-500" />
// // // //               {error}
// // // //             </div>
// // // //           )}

// // // //           {/* Skeleton */}
// // // //           {loading && (
// // // //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// // // //               {Array.from({ length: 8 }).map((_, i) => (
// // // //                 <SkeletonCard key={i} />
// // // //               ))}
// // // //             </div>
// // // //           )}

// // // //           {/* Results */}
// // // //           {!loading && items.length > 0 && (
// // // //             <>
// // // //               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
// // // //                 Found {items.length} item{items.length !== 1 ? 's' : ''}
// // // //                 {region ? ` in ${region.replace(/_/g, ' ')}` : ' across all regions'}
// // // //               </p>
// // // //               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// // // //                 {items.map((item) => (
// // // //                   <ItemCard key={item.id} item={item} />
// // // //                 ))}
// // // //               </div>
// // // //             </>
// // // //           )}

// // // //           {/* Empty */}
// // // //           {!loading && searched && items.length === 0 && !error && (
// // // //             <div className="flex flex-col items-center justify-center py-20 bg-gray-50 border border-dashed border-gray-200 rounded-2xl text-center px-4">
// // // //               <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center mb-4 shadow-sm text-gray-300">
// // // //                 <Search size={22} />
// // // //               </div>
// // // //               <h3 className="text-base font-bold text-[#0f172a] mb-1">No items found</h3>
// // // //               <p className="text-gray-500 text-xs max-w-xs">Try a different region or check back later.</p>
// // // //             </div>
// // // //           )}

// // // //           {/* Idle */}
// // // //           {!loading && !searched && !error && (
// // // //             <div className="flex flex-col items-center justify-center py-24 bg-white border border-gray-100 rounded-2xl shadow-sm text-center px-4">
// // // //               <div className="w-14 h-14 rounded-full bg-blue-50 text-[#1a56db] flex items-center justify-center mb-4 border border-blue-100">
// // // //                 <Search size={24} />
// // // //               </div>
// // // //               <h3 className="text-lg font-bold text-[#0f172a]">Find a reported item</h3>
// // // //               <p className="text-gray-500 text-sm max-w-sm mt-1">
// // // //                 Select a region and click Search to browse found items in your area.
// // // //               </p>
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>

// // // //       {/* Fixed bottom bar – always visible */}
// // // //       <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-md border-t border-[#e2e8f0] shadow-lg py-4 px-4">
// // // //         <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3">
// // // //           <div className="flex items-center gap-2 text-[#0f172a] font-semibold text-sm sm:text-base">
// // // //             <Megaphone size={20} className="text-[#1a56db]" />
// // // //             <span>Lost something? Let our AI find it for you.</span>
// // // //           </div>
// // // //           <Button
// // // //             variant="primary"
// // // //             onClick={() => navigate('/owner/report')}
// // // //             className="whitespace-nowrap"
// // // //           >
// // // //             <Megaphone size={18} className="mr-2" />
// // // //             Report Lost Item
// // // //           </Button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // import { useState } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import {
// // //   Search, AlertCircle, RefreshCw, FileText, Megaphone, ArrowLeft,
// // //   Smartphone, Laptop, FileText as DocIcon, CreditCard, BookOpen,
// // //   ShoppingBag, Wallet, Key, Headphones, Shirt, Gem, Watch,
// // //   Banknote, Car, Zap, Droplets, Baby, Heart, Dog, UtensilsCrossed,
// // //   Umbrella, Package, Globe
// // // } from 'lucide-react';
// // // import { searchPublicItems } from '../../api/items';
// // // import { useAuth } from '../../context/AuthContext';
// // // import Button from '../../components/shared/Button';

// // // /* ── Region enum ─────────────────────────────────────────────── */
// // // const REGIONS = [
// // //   'ARUSHA','DAR_ES_SALAAM','DODOMA','GEITA','IRINGA','KAGERA','KATAVI',
// // //   'KIGOMA','KILIMANJARO','LINDI','MANYARA','MARA','MBEYA','MOROGORO',
// // //   'MTWARA','MWANZA','NJOMBE','PWANI','RUKWA','RUVUMA','SHINYANGA',
// // //   'SIMIYU','SINGIDA','TABORA','TANGA','UNGUJA_KASKAZINI','UNGUJA_KUSINI',
// // //   'UNGUJA_MJINI_MAGHARIBI','PEMBA',
// // // ];

// // // /* ── Category → { icon, bg, color } map ─────────────────────── */
// // // const CATEGORY_ICON_MAP = {
// // //   PHONES:           { icon: Smartphone,      bg: '#dbeafe', color: '#1d4ed8' },
// // //   LAPTOPS:          { icon: Laptop,          bg: '#ede9fe', color: '#7c3aed' },
// // //   DOCUMENTS:        { icon: DocIcon,         bg: '#fef9c3', color: '#b45309' },
// // //   IDS:              { icon: CreditCard,      bg: '#fef9c3', color: '#b45309' },
// // //   PASSPORTS:        { icon: Globe,           bg: '#fef9c3', color: '#b45309' },
// // //   BAGS:             { icon: ShoppingBag,     bg: '#f3e8ff', color: '#9333ea' },
// // //   WALLETS:          { icon: Wallet,          bg: '#dcfce7', color: '#15803d' },
// // //   KEYS:             { icon: Key,             bg: '#ffedd5', color: '#c2410c' },
// // //   ELECTRONICS:      { icon: Zap,             bg: '#e0f2fe', color: '#0369a1' },
// // //   CLOTHES:          { icon: Shirt,           bg: '#fce7f3', color: '#be185d' },
// // //   JEWELRY:          { icon: Gem,             bg: '#fdf4ff', color: '#a21caf' },
// // //   WATCHES:          { icon: Watch,           bg: '#fdf4ff', color: '#a21caf' },
// // //   MONEY:            { icon: Banknote,        bg: '#dcfce7', color: '#15803d' },
// // //   BOOKS:            { icon: BookOpen,        bg: '#fef3c7', color: '#d97706' },
// // //   VEHICLE_ITEMS:    { icon: Car,             bg: '#f1f5f9', color: '#475569' },
// // //   HEADPHONES:       { icon: Headphones,      bg: '#dbeafe', color: '#1d4ed8' },
// // //   CHARGERS_PHONE:   { icon: Smartphone,      bg: '#e0f2fe', color: '#0369a1' },
// // //   CHARGERS_OTHERS:  { icon: Zap,             bg: '#e0f2fe', color: '#0369a1' },
// // //   WATER_BOTTLES:    { icon: Droplets,        bg: '#e0f2fe', color: '#0284c7' },
// // //   TOYS:             { icon: Baby,            bg: '#fce7f3', color: '#db2777' },
// // //   MEDICAL_ITEMS:    { icon: Heart,           bg: '#fee2e2', color: '#dc2626' },
// // //   SPORTS_ITEMS:     { icon: Heart,           bg: '#dcfce7', color: '#16a34a' },
// // //   PET_ITEMS:        { icon: Dog,             bg: '#fef9c3', color: '#ca8a04' },
// // //   FOOD_CONTAINERS:  { icon: UtensilsCrossed, bg: '#ffedd5', color: '#ea580c' },
// // //   UMBRELLAS:        { icon: Umbrella,        bg: '#e0f2fe', color: '#0369a1' },
// // //   OTHERS:           { icon: Package,         bg: '#f1f5f9', color: '#475569' },
// // // };

// // // const DEFAULT_CATEGORY = { icon: Package, bg: '#f1f5f9', color: '#475569' };

// // // /* ── Skeleton card ───────────────────────────────────────────── */
// // // function SkeletonCard() {
// // //   return (
// // //     <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden">
// // //       <div
// // //         className="h-44"
// // //         style={{
// // //           background: 'linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)',
// // //           backgroundSize: '400px 100%',
// // //           animation: 'shimmer 1.4s ease-in-out infinite',
// // //         }}
// // //       />
// // //       <div className="p-4 space-y-2">
// // //         <div className="h-4 w-3/4 rounded bg-gray-100" style={{ animation: 'shimmer 1.4s ease-in-out infinite' }} />
// // //         <div className="h-3 w-1/2 rounded bg-gray-100" style={{ animation: 'shimmer 1.4s ease-in-out 0.2s infinite' }} />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // /* ── Category placeholder ────────────────────────────────────── */
// // // function CategoryPlaceholder({ category }) {
// // //   const cfg = CATEGORY_ICON_MAP[category] || DEFAULT_CATEGORY;
// // //   const IconComp = cfg.icon;
// // //   return (
// // //     <div
// // //       className="w-full h-full flex flex-col items-center justify-center gap-2"
// // //       style={{ backgroundColor: cfg.bg }}
// // //     >
// // //       <IconComp
// // //         size={44}
// // //         strokeWidth={1.4}
// // //         style={{ color: cfg.color }}
// // //         aria-hidden="true"
// // //       />
// // //       <span
// // //         className="text-xs font-semibold tracking-wide"
// // //         style={{ color: cfg.color, opacity: 0.75 }}
// // //       >
// // //         {(category || 'ITEM').replace(/_/g, ' ')}
// // //       </span>
// // //     </div>
// // //   );
// // // }

// // // /* ── Item card ───────────────────────────────────────────────── */
// // // function ItemCard({ item }) {
// // //   const [imgError, setImgError] = useState(false);
// // //   const showPlaceholder = !item.previewImage || imgError;

// // //   return (
// // //     <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden
// // //                     transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
// // //       <div className="h-44 overflow-hidden">
// // //         {!showPlaceholder ? (
// // //           <img
// // //             src={item.previewImage}
// // //             alt={item.itemName}
// // //             className="w-full h-full object-cover"
// // //             onError={() => setImgError(true)}
// // //           />
// // //         ) : (
// // //           <CategoryPlaceholder category={item.category} />
// // //         )}
// // //       </div>
// // //       <div className="p-4">
// // //         <h3 className="text-sm font-semibold text-[#0f172a] truncate">
// // //           {item.itemName || 'Unnamed Item'}
// // //         </h3>
// // //         {item.category && (
// // //           <p className="text-xs text-gray-400 mt-0.5 truncate">
// // //             {item.category.replace(/_/g, ' ')}
// // //           </p>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // /* ── Main page ───────────────────────────────────────────────── */
// // // export default function SearchItems() {
// // //   const navigate = useNavigate();
// // //   const { user } = useAuth();
// // //   const stored   = JSON.parse(localStorage.getItem('user') || '{}');
// // //   const userName = stored.name || user?.name || 'User';
// // //   const firstName = userName.split(' ')[0];

// // //   const [region,   setRegion]   = useState('');
// // //   const [items,    setItems]    = useState([]);
// // //   const [loading,  setLoading]  = useState(false);
// // //   const [error,    setError]    = useState('');
// // //   const [searched, setSearched] = useState(false);

// // //   const handleSearch = async () => {
// // //     try {
// // //       setLoading(true);
// // //       setError('');
// // //       setSearched(true);
// // //       const result = await searchPublicItems({
// // //         region: region || undefined,
// // //         page: 0,
// // //         size: 20,
// // //       });
// // //       // handle both response shapes: result.data.content or result.content
// // //       setItems(result?.data?.content ?? result?.content ?? []);
// // //     } catch (err) {
// // //       setError('Unable to load items. Please try again.');
// // //       setItems([]);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       <style>{`
// // //         @keyframes shimmer {
// // //           0%   { background-position: -400px 0; }
// // //           100% { background-position:  400px 0; }
// // //         }
// // //         @keyframes fadeUp {
// // //           from { opacity: 0; transform: translateY(10px); }
// // //           to   { opacity: 1; transform: translateY(0); }
// // //         }
// // //         .fade-up { animation: fadeUp 0.35s ease-out forwards; }
// // //       `}</style>

// // //       <div className="min-h-screen bg-[#f8fafc] flex flex-col">

// // //         {/* ── Scrollable content ─────────────────────────────── */}
// // //         <div className="flex-1 pb-32">
// // //           <div className="max-w-7xl mx-auto px-4 py-8">

// // //             {/* ── Top row ──────────────────────────────────────── */}
// // //             <div className="flex items-center justify-between mb-8 gap-4">

// // //               {/* Back button + greeting */}
// // //               <div className="flex items-center gap-3 min-w-0">
// // //                 <button
// // //                   onClick={() => navigate('/')}
// // //                   aria-label="Back to home"
// // //                   className="shrink-0 w-10 h-10 flex items-center justify-center
// // //                              rounded-xl border border-[#e2e8f0] bg-white text-gray-500
// // //                              hover:text-[#0f172a] hover:bg-gray-50 hover:border-gray-300
// // //                              transition-all active:scale-95"
// // //                 >
// // //                   <ArrowLeft size={18} />
// // //                 </button>

// // //                 <div className="min-w-0">
// // //                   <h1 className="text-xl sm:text-2xl font-bold text-[#0f172a] truncate">
// // //                     Hi, {firstName}! 👋
// // //                   </h1>
// // //                   <p className="text-sm text-gray-500 mt-0.5 hidden sm:block">
// // //                     Search for found items across Tanzania
// // //                   </p>
// // //                 </div>
// // //               </div>

// // //               {/* My Reports */}
// // //               <Button
// // //                 variant="primary"
// // //                 onClick={() => navigate('/owner/reports')}
// // //                 className="shrink-0"
// // //               >
// // //                 <FileText size={16} className="mr-1.5" />
// // //                 My Reports
// // //               </Button>
// // //             </div>

// // //             {/* ── Filter bar ───────────────────────────────────── */}
// // //             <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-sm mb-8">
// // //               <div className="flex flex-col sm:flex-row gap-3">
// // //                 <div className="flex-1">
// // //                   <label className="block text-xs font-bold text-gray-400
// // //                                     uppercase tracking-wider mb-2">
// // //                     Filter by region
// // //                   </label>
// // //                   <select
// // //                     value={region}
// // //                     onChange={(e) => setRegion(e.target.value)}
// // //                     onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
// // //                     className="w-full px-4 py-2.5 rounded-xl border border-[#e2e8f0]
// // //                                focus:ring-2 focus:ring-[#1a56db]/20 focus:border-[#1a56db]
// // //                                outline-none bg-white text-gray-800 text-sm transition-all"
// // //                   >
// // //                     <option value="">All Regions</option>
// // //                     {REGIONS.map((r) => (
// // //                       <option key={r} value={r}>{r.replace(/_/g, ' ')}</option>
// // //                     ))}
// // //                   </select>
// // //                 </div>

// // //                 <div className="sm:self-end">
// // //                   <button
// // //                     onClick={handleSearch}
// // //                     disabled={loading}
// // //                     className="w-full sm:w-auto flex items-center justify-center gap-2
// // //                                px-6 py-2.5 rounded-xl bg-[#1a56db] text-white font-semibold
// // //                                text-sm transition-all hover:bg-[#1547c0] active:scale-95
// // //                                disabled:opacity-70 disabled:cursor-not-allowed"
// // //                     style={{ minWidth: 140 }}
// // //                   >
// // //                     {loading ? (
// // //                       <><RefreshCw size={15} className="animate-spin" /> Searching...</>
// // //                     ) : (
// // //                       <><Search size={15} /> Search</>
// // //                     )}
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             {/* ── Error ────────────────────────────────────────── */}
// // //             {error && (
// // //               <div className="flex items-center gap-3 bg-red-50 border border-red-200
// // //                               text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
// // //                 <AlertCircle size={16} className="shrink-0" />
// // //                 <span className="flex-1">{error}</span>
// // //                 <button
// // //                   onClick={handleSearch}
// // //                   className="text-xs font-semibold underline hover:no-underline shrink-0"
// // //                 >
// // //                   Retry
// // //                 </button>
// // //               </div>
// // //             )}

// // //             {/* ── Skeleton ─────────────────────────────────────── */}
// // //             {loading && (
// // //               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
// // //                 {Array.from({ length: 10 }).map((_, i) => (
// // //                   <SkeletonCard key={i} />
// // //                 ))}
// // //               </div>
// // //             )}

// // //             {/* ── Results ──────────────────────────────────────── */}
// // //             {!loading && items.length > 0 && (
// // //               <div className="fade-up">
// // //                 <p className="text-xs font-bold text-gray-400 uppercase
// // //                               tracking-widest mb-4">
// // //                   {items.length} item{items.length !== 1 ? 's' : ''} found
// // //                   {region ? ` in ${region.replace(/_/g, ' ')}` : ' across all regions'}
// // //                 </p>
// // //                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
// // //                   {items.map((item, i) => (
// // //                     <div
// // //                       key={item.id}
// // //                       className="fade-up"
// // //                       style={{ animationDelay: `${i * 25}ms` }}
// // //                     >
// // //                       <ItemCard item={item} />
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             )}

// // //             {/* ── Empty state ───────────────────────────────────── */}
// // //             {!loading && searched && items.length === 0 && !error && (
// // //               <div className="flex flex-col items-center justify-center py-20
// // //                               bg-white border border-dashed border-[#e2e8f0]
// // //                               rounded-2xl text-center px-4 fade-up">
// // //                 <div className="w-14 h-14 rounded-full bg-[#f8fafc] border border-[#e2e8f0]
// // //                                 flex items-center justify-center mb-4">
// // //                   <Search size={26} className="text-gray-300" />
// // //                 </div>
// // //                 <h3 className="text-base font-bold text-[#0f172a] mb-1">
// // //                   No items found
// // //                 </h3>
// // //                 <p className="text-sm text-gray-500 max-w-xs">
// // //                   Try a different region or check back later.
// // //                 </p>
// // //               </div>
// // //             )}

// // //             {/* ── Idle state ────────────────────────────────────── */}
// // //             {!loading && !searched && !error && (
// // //               <div className="flex flex-col items-center justify-center py-24
// // //                               bg-white border border-[#e2e8f0] rounded-2xl
// // //                               text-center px-4 fade-up">
// // //                 <div className="w-16 h-16 rounded-full bg-[#eff6ff] border border-[#bfdbfe]
// // //                                 flex items-center justify-center mb-4">
// // //                   <Search size={28} className="text-[#1a56db]" />
// // //                 </div>
// // //                 <h3 className="text-lg font-bold text-[#0f172a] mb-1">
// // //                   Find a reported item
// // //                 </h3>
// // //                 <p className="text-sm text-gray-500 max-w-sm">
// // //                   Select a region and click Search to browse found items in your area.
// // //                 </p>
// // //               </div>
// // //             )}

// // //           </div>
// // //         </div>

// // //         {/* ── Fixed bottom CTA bar ─────────────────────────────── */}
// // //         <div
// // //           className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#e2e8f0]
// // //                      py-4 px-4"
// // //           style={{ backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)' }}
// // //         >
// // //           <div className="max-w-3xl mx-auto flex flex-col sm:flex-row
// // //                           items-center justify-center gap-3">
// // //             <div className="flex items-center gap-2 text-[#0f172a]
// // //                             font-semibold text-sm sm:text-base">
// // //               <Megaphone size={20} className="text-[#1a56db] shrink-0" />
// // //               <span>Lost something? Let our AI find it for you.</span>
// // //             </div>
// // //             <Button
// // //               variant="primary"
// // //               onClick={() => navigate('/owner/report')}
// // //               className="whitespace-nowrap shrink-0"
// // //             >
// // //               <Megaphone size={16} className="mr-1.5" />
// // //               Report Lost Item
// // //             </Button>
// // //           </div>
// // //         </div>

// // //       </div>
// // //     </>
// // //   );
// // // }

// // // src/pages/HomePage.jsx

// // import { useState, useCallback, useEffect, useRef } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useAuth } from '../context/AuthContext';
// // import Navbar from '../components/layout/Navbar';
// // import Footer from '../components/layout/Footer';
// // import Hero from '../components/sections/Hero';
// // import TrustStats from '../components/sections/TrustStats';
// // import HowItWorks from '../components/sections/HowItWorks';
// // import Categories from '../components/sections/Categories';
// // import WhyChoose from '../components/sections/WhyChoose';
// // import Testimonials from '../components/sections/Testimonials';
// // import FAQ from '../components/sections/FAQ';
// // import CTA from '../components/sections/CTA';            // kept if still used elsewhere
// // import { createLostReport } from '../api/items';
// // import Button from '../components/shared/Button';
// // import Input from '../components/shared/Input';
// // import {
// //   Search, Megaphone, ArrowRight, LogOut, Loader2,
// //   X, AlertCircle, CheckCircle, Brain, Upload, Trash2,
// //   LayoutDashboard, List, MapPin, Building2, Calendar, Tag,
// //   BarChart3                     // for match scores icon
// // } from 'lucide-react';

// // /* ──────────────────────────────────────────────
// //    Animated Counter Hook
// // ────────────────────────────────────────────── */
// // function useCountUp(target, duration = 2000, startCounting = true) {
// //   const [count, setCount] = useState(0);
// //   const frameRef = useRef(null);

// //   useEffect(() => {
// //     if (!startCounting) return;
// //     const startTime = performance.now();
// //     const animate = (currentTime) => {
// //       const elapsed = currentTime - startTime;
// //       const progress = Math.min(elapsed / duration, 1);
// //       // easeOutQuad
// //       const eased = 1 - (1 - progress) * (1 - progress);
// //       setCount(Math.floor(eased * target));
// //       if (progress < 1) {
// //         frameRef.current = requestAnimationFrame(animate);
// //       } else {
// //         setCount(target);
// //       }
// //     };
// //     frameRef.current = requestAnimationFrame(animate);
// //     return () => cancelAnimationFrame(frameRef.current);
// //   }, [target, duration, startCounting]);

// //   return count;
// // }

// // /* ──────────────────────────────────────────────
// //    Constants & Animations (for the modal)
// // ────────────────────────────────────────────── */
// // const CATEGORIES = [
// //   'PHONES','LAPTOPS','DOCUMENTS','IDS','PASSPORTS','BAGS','WALLETS','KEYS',
// //   'ELECTRONICS','CLOTHES','JEWELRY','WATCHES','MONEY','BOOKS','VEHICLE_ITEMS',
// //   'HEADPHONES','CHARGERS_PHONE','CHARGERS_OTHERS','WATER_BOTTLES','TOYS',
// //   'MEDICAL_ITEMS','SPORTS_ITEMS','PET_ITEMS','FOOD_CONTAINERS','UMBRELLAS','OTHERS'
// // ];
// // const REGIONS = [
// //   'ARUSHA','DAR_ES_SALAAM','DODOMA','GEITA','IRINGA','KAGERA','KATAVI',
// //   'KIGOMA','KILIMANJARO','LINDI','MANYARA','MARA','MBEYA','MOROGORO',
// //   'MTWARA','MWANZA','NJOMBE','PWANI','RUKWA','RUVUMA','SHINYANGA',
// //   'SIMIYU','SINGIDA','TABORA','TANGA','UNGUJA_KASKAZINI','UNGUJA_KUSINI',
// //   'UNGUJA_MJINI_MAGHARIBI','PEMBA'
// // ];
// // const STEP_TITLES = ['Basic Information', 'Location Details', 'Images'];

// // const animStyles = `
// //   @keyframes spin-slow {
// //     from { transform: rotate(0deg); }
// //     to { transform: rotate(360deg); }
// //   }
// //   @keyframes pulse-ring {
// //     0% { transform: scale(0.8); opacity: 1; }
// //     100% { transform: scale(2); opacity: 0; }
// //   }
// //   @keyframes fadeInUp {
// //     from { opacity: 0; transform: translateY(20px); }
// //     to { opacity: 1; transform: translateY(0); }
// //   }
// //   @keyframes dotBounce {
// //     0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
// //     40% { transform: scale(1); opacity: 1; }
// //   }
// //   .ai-spinner-outer { animation: spin-slow 1.4s linear infinite; }
// //   .ai-spinner-inner { animation: spin-slow 1s linear infinite reverse; }
// //   .fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
// //   .dot-bounce { animation: dotBounce 1.2s ease-in-out infinite; }
// // `;

// // function SelectField({ label, name, value, onChange, options, placeholder, required }) {
// //   return (
// //     <div>
// //       <label className="block text-sm font-medium text-gray-700 mb-1">
// //         {label}{required && <span className="text-red-500 ml-0.5">*</span>}
// //       </label>
// //       <select
// //         name={name}
// //         value={value}
// //         onChange={onChange}
// //         className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-gray-800 transition-all"
// //       >
// //         <option value="">{placeholder}</option>
// //         {options.map(o => (
// //           <option key={o.value} value={o.value}>{o.label}</option>
// //         ))}
// //       </select>
// //     </div>
// //   );
// // }

// // /* ──────────────────────────────────────────────
// //    Match Scores Display
// // ────────────────────────────────────────────── */
// // function MatchScores({ matches }) {
// //   if (!matches || matches.length === 0) return null;
// //   return (
// //     <div className="space-y-3 mt-4">
// //       <h4 className="flex items-center gap-2 font-semibold text-sm text-gray-700">
// //         <BarChart3 size={16} /> AI Match Breakdown
// //       </h4>
// //       {matches.map((match) => (
// //         <div
// //           key={match.organizationItemId}
// //           className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-sm"
// //         >
// //           <h3 className="font-bold text-blue-600 mb-2">
// //             Final Score: {match.finalScore}%
// //           </h3>
// //           <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-gray-600">
// //             <p>Description: {match.descriptionScore}%</p>
// //             <p>Name: {match.nameScore}%</p>
// //             <p>Location: {match.locationScore}%</p>
// //             <p>Date: {match.dateScore}%</p>
// //             <p>Color: {match.colorScore}%</p>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// // /* ──────────────────────────────────────────────
// //    ReportItemModal (inline definition)
// // ────────────────────────────────────────────── */
// // function ReportItemModal({ onClose, onSuccess }) {
// //   const navigate = useNavigate();
// //   const [step, setStep] = useState(0); // 0,1,2=form; 3=AI processing; 4=result
// //   const [form, setForm] = useState({
// //     itemName: '', description: '', category: '', lostDate: '', region: '',
// //     area: '', lostLocation: '', dominantColor: '', latitude: '', longitude: '',
// //     imageUrls: [],
// //   });
// //   const [imageFiles, setImageFiles] = useState([]);
// //   const [imagePreviews, setImagePreviews] = useState([]);
// //   const [error, setError] = useState('');
// //   const [submitting, setSubmitting] = useState(false);
// //   const [reportId, setReportId] = useState(null);
// //   const [matchResult, setMatchResult] = useState(null);
// //   const [isDragOver, setIsDragOver] = useState(false);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setForm(prev => ({ ...prev, [name]: value }));
// //   };

// //   const addImageFiles = useCallback((files) => {
// //     const imageOnly = files.filter(f => f.type.startsWith('image/'));
// //     if (!imageOnly.length) return;
// //     setImageFiles(prev => [...prev, ...imageOnly]);
// //     const newPreviews = imageOnly.map(file => URL.createObjectURL(file));
// //     setImagePreviews(prev => [...prev, ...newPreviews]);
// //     setForm(prev => ({ ...prev, imageUrls: [...prev.imageUrls, ...newPreviews] }));
// //   }, []);

// //   const handleImageUpload = (e) => {
// //     addImageFiles(Array.from(e.target.files));
// //     e.target.value = '';
// //   };

// //   const handleDrop = (e) => {
// //     e.preventDefault();
// //     setIsDragOver(false);
// //     addImageFiles(Array.from(e.dataTransfer.files));
// //   };

// //   const removeImage = (index) => {
// //     URL.revokeObjectURL(imagePreviews[index]);
// //     setImageFiles(prev => prev.filter((_, i) => i !== index));
// //     setImagePreviews(prev => prev.filter((_, i) => i !== index));
// //     setForm(prev => ({
// //       ...prev,
// //       imageUrls: prev.imageUrls.filter((_, i) => i !== index),
// //     }));
// //   };

// //   const validateStep = () => {
// //     setError('');
// //     if (step === 0) {
// //       if (!form.itemName.trim()) { setError('Item name is required'); return false; }
// //       if (!form.category) { setError('Please select a category'); return false; }
// //       if (!form.description.trim()) { setError('Description is required'); return false; }
// //     }
// //     if (step === 1) {
// //       if (!form.region) { setError('Region is required'); return false; }
// //       if (!form.area.trim()) { setError('Area is required'); return false; }
// //       if (!form.lostDate) { setError('Lost date is required'); return false; }
// //       if (!form.lostLocation.trim()) { setError('Lost location is required'); return false; }
// //     }
// //     return true;
// //   };

// //   const nextStep = () => { if (validateStep()) setStep(prev => Math.min(prev + 1, 2)); };
// //   const prevStep = () => { setError(''); setStep(prev => Math.max(prev - 1, 0)); };

// //   const handleSubmit = async () => {
// //     if (!validateStep()) return;
// //     setSubmitting(true);
// //     setError('');
// //     try {
// //       const payload = {
// //         itemName: form.itemName,
// //         description: form.description,
// //         category: form.category,
// //         lostDate: form.lostDate,
// //         region: form.region,
// //         area: form.area,
// //         lostLocation: form.lostLocation,
// //         ...(form.dominantColor && { dominantColor: form.dominantColor }),
// //         ...(form.latitude && { latitude: parseFloat(form.latitude) }),
// //         ...(form.longitude && { longitude: parseFloat(form.longitude) }),
// //         ...(form.imageUrls.length > 0 && { imageUrls: form.imageUrls }),
// //       };

// //       const response = await createLostReport(payload);
// //       const data = response?.data || response;
// //       setReportId(data.id || null);
// //       setMatchResult(data);

// //       setSubmitting(false);
// //       setStep(3);                                          // AI processing animation
// //       setTimeout(() => setStep(4), 1200);
// //     } catch (err) {
// //       setError(err.message || 'Something went wrong.');
// //       setSubmitting(false);
// //     }
// //   };

// //   const isFormStep = step <= 2;
// //   const canClose = step !== 3;

// //   const categoryOptions = CATEGORIES.map(c => ({
// //     value: c,
// //     label: c.replace(/_/g, ' ').charAt(0) + c.replace(/_/g, ' ').slice(1).toLowerCase()
// //   }));
// //   const regionOptions = REGIONS.map(r => ({ value: r, label: r.replace(/_/g, ' ') }));

// //   const hasMatch = matchResult?.matched === true;
// //   const matchDetails = matchResult?.matchDetails || {};
// //   const matchLevel = matchResult?.matchLevel || matchDetails?.matchLevel;

// //   const getMatchBadge = (level) => {
// //     if (level === 'POTENTIAL_MATCH') return { bg: '#dbeafe', text: '#1e40af', label: 'Potential Match' };
// //     if (level === 'NO_MATCH') return { bg: '#fee2e2', text: '#991b1b', label: 'No Match' };
// //     return null;
// //   };
// //   const matchBadge = matchLevel ? getMatchBadge(matchLevel) : null;

// //   // Extract matches array from response (if any)
// //   const matches = matchResult?.matches || matchDetails?.matches || [];

// //   return (
// //     <>
// //       <style>{animStyles}</style>
// //       <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}>
// //         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative flex flex-col" style={{ maxHeight: '92vh' }}>

// //           {/* Header */}
// //           <div className="flex items-center justify-between px-8 pt-7 pb-4 border-b border-gray-100 shrink-0">
// //             <div>
// //               <h2 className="text-xl font-bold text-gray-900">
// //                 {step === 3 ? 'Analyzing Your Report' : step === 4 ? 'Report Result' : 'Report Lost Item'}
// //               </h2>
// //               {isFormStep && (
// //                 <p className="text-sm text-gray-500 mt-0.5">Step {step + 1} of 3 — {STEP_TITLES[step]}</p>
// //               )}
// //             </div>
// //             <button onClick={canClose ? onClose : undefined} disabled={!canClose}
// //               className={`rounded-full p-1.5 transition-colors ${canClose ? 'text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer' : 'text-gray-200 cursor-not-allowed'}`}
// //               aria-label="Close">
// //               <X size={22} />
// //             </button>
// //           </div>

// //           {/* Progress Bar */}
// //           {isFormStep && (
// //             <div className="px-8 pt-4 shrink-0">
// //               <div className="flex gap-2">
// //                 {[0, 1, 2].map(i => (
// //                   <div key={i} className="flex-1 h-1.5 rounded-full transition-all duration-500"
// //                     style={{ backgroundColor: i <= step ? '#1a56db' : '#e2e8f0' }} />
// //                 ))}
// //               </div>
// //               <div className="flex justify-between mt-1.5">
// //                 {STEP_TITLES.map((title, i) => (
// //                   <span key={i} className="text-xs transition-colors duration-300"
// //                     style={{ color: i <= step ? '#1a56db' : '#94a3b8' }}>{title}</span>
// //                 ))}
// //               </div>
// //             </div>
// //           )}

// //           {/* Content */}
// //           <div className="overflow-y-auto flex-1 px-8 py-6">
// //             {error && isFormStep && (
// //               <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 flex items-center gap-2 text-sm">
// //                 <AlertCircle size={16} className="shrink-0" /> {error}
// //               </div>
// //             )}

// //             {/* STEP 0 */}
// //             {step === 0 && (
// //               <div className="space-y-5 fade-in-up">
// //                 <Input label="Item Name" name="itemName" placeholder="Enter the name of the lost item" value={form.itemName} onChange={handleChange} required />
// //                 <SelectField label="Category" name="category" value={form.category} onChange={handleChange} options={categoryOptions} placeholder="Select a category" required />
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
// //                   <textarea name="description" rows={4} placeholder="Describe your lost item" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-gray-800 transition-all text-sm" value={form.description} onChange={handleChange} />
// //                 </div>
// //               </div>
// //             )}

// //             {/* STEP 1 */}
// //             {step === 1 && (
// //               <div className="space-y-5 fade-in-up">
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //                   <SelectField label="Region" name="region" value={form.region} onChange={handleChange} options={regionOptions} placeholder="Select a region" required />
// //                   <Input label="Area" name="area" placeholder="e.g., Kijitonyama" value={form.area} onChange={handleChange} required />
// //                 </div>
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //                   <Input label="Date Lost" type="date" name="lostDate" value={form.lostDate} onChange={handleChange} required max={new Date().toISOString().split('T')[0]} />
// //                   <Input label="Dominant Color" name="dominantColor" placeholder="e.g., Black, Silver" value={form.dominantColor} onChange={handleChange} />
// //                 </div>
// //                 <Input label="Lost Location" name="lostLocation" placeholder="e.g., Bus Stop near Posta" value={form.lostLocation} onChange={handleChange} required />
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-1">GPS Coordinates <span className="text-gray-400 font-normal">(optional)</span></label>
// //                   <div className="grid grid-cols-2 gap-4">
// //                     <Input name="latitude" placeholder="Latitude: -6.7924" value={form.latitude} onChange={handleChange} />
// //                     <Input name="longitude" placeholder="Longitude: 39.2083" value={form.longitude} onChange={handleChange} />
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* STEP 2 */}
// //             {step === 2 && (
// //               <div className="space-y-4 fade-in-up">
// //                 <p className="text-sm text-gray-500">Upload photos of the lost item to improve AI matching accuracy. <span className="text-gray-400">(optional)</span></p>
// //                 <div
// //                   onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
// //                   onDragLeave={() => setIsDragOver(false)}
// //                   onDrop={handleDrop}
// //                   className="rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 cursor-pointer"
// //                   style={{ borderColor: isDragOver ? '#1a56db' : '#d1d5db', backgroundColor: isDragOver ? '#eff6ff' : '#f9fafb' }}
// //                   onClick={() => document.getElementById('modalImageUpload').click()}
// //                 >
// //                   <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="modalImageUpload" />
// //                   <Upload size={32} className="mx-auto mb-3" style={{ color: isDragOver ? '#1a56db' : '#9ca3af' }} />
// //                   <p className="font-medium text-gray-600 text-sm">{isDragOver ? 'Drop images here' : 'Click or drag images here'}</p>
// //                   <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP — up to 5MB each</p>
// //                 </div>
// //                 {imagePreviews.length > 0 && (
// //                   <div>
// //                     <p className="text-xs font-medium text-gray-500 mb-2">{imagePreviews.length} image{imagePreviews.length > 1 ? 's' : ''} selected</p>
// //                     <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
// //                       {imagePreviews.map((src, idx) => (
// //                         <div key={idx} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100">
// //                           <img src={src} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
// //                           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center">
// //                             <button onClick={(e) => { e.stopPropagation(); removeImage(idx); }} className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5" aria-label="Remove image"><Trash2 size={14} /></button>
// //                           </div>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             )}

// //             {/* STEP 3: AI Processing */}
// //             {step === 3 && (
// //               <div className="flex flex-col items-center justify-center py-10 fade-in-up">
// //                 <div className="relative flex items-center justify-center mb-8" style={{ width: 120, height: 120 }}>
// //                   <div className="absolute rounded-full" style={{ width: 120, height: 120, border: '3px solid #1a56db20', animation: 'pulse-ring 2s ease-out infinite' }} />
// //                   <div className="absolute rounded-full" style={{ width: 120, height: 120, border: '3px solid #1a56db20', animation: 'pulse-ring 2s ease-out 0.5s infinite' }} />
// //                   <svg width="90" height="90" viewBox="0 0 90 90" className="ai-spinner-outer">
// //                     <circle cx="45" cy="45" r="40" fill="none" stroke="#e2e8f0" strokeWidth="4" />
// //                     <circle cx="45" cy="45" r="40" fill="none" stroke="#1a56db" strokeWidth="4" strokeLinecap="round" strokeDasharray="251" strokeDashoffset="190" />
// //                   </svg>
// //                   <svg width="60" height="60" viewBox="0 0 60 60" className="absolute ai-spinner-inner">
// //                     <circle cx="30" cy="30" r="24" fill="none" stroke="#e2e8f0" strokeWidth="4" />
// //                     <circle cx="30" cy="30" r="24" fill="none" stroke="#e11d48" strokeWidth="4" strokeLinecap="round" strokeDasharray="150" strokeDashoffset="110" />
// //                   </svg>
// //                   <Brain size={22} className="absolute" style={{ color: '#1a56db' }} />
// //                 </div>
// //                 <h3 className="text-xl font-bold text-gray-900 mb-2">Analyzing your report...</h3>
// //                 <p className="text-gray-500 text-sm text-center max-w-xs">Our intelligent matching system is comparing your report with available found items.</p>
// //                 <div className="flex gap-2 mt-6">
// //                   {[0, 1, 2].map(i => (
// //                     <div key={i} className="w-2.5 h-2.5 rounded-full dot-bounce" style={{ backgroundColor: '#1a56db', animationDelay: `${i * 0.2}s` }} />
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {/* STEP 4: Result */}
// //             {step === 4 && (
// //               <div className="flex flex-col py-4 fade-in-up">
// //                 {hasMatch ? (
// //                   <div className="space-y-5">
// //                     <div className="flex items-center gap-3">
// //                       <CheckCircle size={28} className="text-green-500" />
// //                       <h3 className="text-xl font-bold text-gray-900">
// //                         {matchLevel === 'POTENTIAL_MATCH' ? 'Potential Match Found!' : 'Match Found!'}
// //                       </h3>
// //                       {matchBadge && (
// //                         <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: matchBadge.bg, color: matchBadge.text }}>
// //                           {matchBadge.label}
// //                         </span>
// //                       )}
// //                     </div>
// //                     <p className="text-sm text-gray-600">A potential match for your lost item has been identified.</p>
// //                     <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-3">
// //                       {matchDetails.previewImage && <img src={matchDetails.previewImage} alt="Matched item" className="w-full h-48 object-cover rounded-lg mb-3" />}
// //                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
// //                         <div className="flex items-center gap-2"><Tag size={16} className="text-gray-500" /><span className="text-gray-600">Item:</span><span className="font-medium text-gray-800">{matchDetails.itemName || '—'}</span></div>
// //                         <div className="flex items-center gap-2"><Building2 size={16} className="text-gray-500" /><span className="text-gray-600">Organization:</span><span className="font-medium text-gray-800">{matchDetails.organizationName || '—'}</span></div>
// //                         <div className="flex items-center gap-2"><MapPin size={16} className="text-gray-500" /><span className="text-gray-600">Region:</span><span className="font-medium text-gray-800">{matchDetails.region || '—'}</span></div>
// //                         <div className="flex items-center gap-2"><MapPin size={16} className="text-gray-500" /><span className="text-gray-600">Area:</span><span className="font-medium text-gray-800">{matchDetails.area || '—'}</span></div>
// //                         <div className="flex items-center gap-2 col-span-full"><Calendar size={16} className="text-gray-500" /><span className="text-gray-600">Found Date:</span><span className="font-medium text-gray-800">{matchDetails.foundDate || '—'}</span></div>
// //                       </div>
// //                     </div>

// //                     {/* AI Match Scores */}
// //                     <MatchScores matches={matches} />

// //                     <div className="flex flex-col sm:flex-row gap-3 mt-2">
// //                       <button onClick={() => navigate(`/owner/claim/${reportId}`)} className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95" style={{ backgroundColor: '#1a56db' }}>View Details</button>
// //                       <button onClick={() => { onSuccess?.(); onClose(); }} className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-200 hover:bg-gray-100 active:scale-95" style={{ color: '#1a56db', border: '1.5px solid #1a56db' }}><List size={18} /> My Reports</button>
// //                     </div>
// //                   </div>
// //                 ) : (
// //                   <div className="text-center py-6">
// //                     <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4"><AlertCircle size={32} /></div>
// //                     <h3 className="text-xl font-bold text-gray-900 mb-2">No Matching Item Found</h3>
// //                     <p className="text-gray-500 mb-6 max-w-md mx-auto">No matching item has been found yet. Your report has been saved successfully. Future found items may still be matched automatically.</p>
// //                     <div className="flex flex-col sm:flex-row gap-3 justify-center">
// //                       <button onClick={() => { onSuccess?.(); onClose(); }} className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-200 hover:bg-gray-100 active:scale-95" style={{ color: '#1a56db', border: '1.5px solid #1a56db' }}><List size={18} /> My Reports</button>
// //                       <button onClick={() => navigate('/owner/dashboard')} className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95" style={{ backgroundColor: '#1a56db' }}><LayoutDashboard size={18} /> Dashboard</button>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             )}
// //           </div>

// //           {/* Footer (form steps only) */}
// //           {isFormStep && (
// //             <div className="px-8 py-5 border-t border-gray-100 flex justify-between items-center shrink-0">
// //               <button onClick={prevStep} disabled={step === 0} className="px-5 py-2.5 rounded-xl border font-medium text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50" style={{ borderColor: '#e2e8f0', color: '#374151' }}>← Back</button>
// //               {step < 2 ? (
// //                 <button onClick={nextStep} className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-95" style={{ backgroundColor: '#1a56db' }}>Next →</button>
// //               ) : (
// //                 <button onClick={handleSubmit} disabled={submitting} className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed" style={{ backgroundColor: '#1a56db', minWidth: 140 }}>
// //                   {submitting ? (
// //                     <span className="flex items-center justify-center gap-2">
// //                       <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent" style={{ animation: 'spin-slow 0.8s linear infinite' }} />
// //                       Submitting...
// //                     </span>
// //                   ) : 'Submit Report'}
// //                 </button>
// //               )}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // /* ──────────────────────────────────────────────
// //    HomeCTA (in‑file replacement for /sections/CTA)
// // ────────────────────────────────────────────── */
// // function HomeCTA({ isOwner, onReportClick }) {
// //   const navigate = useNavigate();

// //   return (
// //     <section className="py-24 bg-[#1a56db] relative overflow-hidden">
// //       <div
// //         className="absolute inset-0 opacity-[0.06]"
// //         style={{
// //           backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
// //           backgroundSize: '28px 28px',
// //         }}
// //       />
// //       <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
// //         <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold tracking-wider uppercase mb-5 border border-white/20">
// //           Start today — it's free
// //         </span>
// //         <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
// //           Start Your Recovery<br className="hidden sm:block" /> Journey Today
// //         </h2>
// //         <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
// //           Don't let a lost item disrupt your life. Join thousands of Tanzanians
// //           who trust PataChako for secure and efficient recovery.
// //         </p>

// //         <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //           {/* Report lost item – opens modal */}
// //           <button
// //             onClick={isOwner ? onReportClick : () => navigate('/register')}
// //             className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-white text-[#1a56db] font-bold text-sm hover:bg-blue-50 active:scale-95 transition-all shadow-lg shadow-black/20"
// //           >
// //             <Megaphone size={18} />
// //             {isOwner ? 'Report lost item' : 'Get started free'}
// //             <ArrowRight size={16} />
// //           </button>

// //           {/* Search found items – navigates to search */}
// //           <button
// //             onClick={() => navigate(isOwner ? '/owner/search' : '/register')}
// //             className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl border-2 border-white/40 text-white font-bold text-sm hover:bg-white/10 hover:border-white/70 active:scale-95 transition-all"
// //           >
// //             <Search size={17} />
// //             Search found items
// //           </button>
// //         </div>

// //         {!isOwner && (
// //           <p className="text-white/50 text-xs mt-6">
// //             Already have an account?{' '}
// //             <button
// //               onClick={() => navigate('/login')}
// //               className="text-white/80 underline hover:text-white transition-colors"
// //             >
// //               Sign in
// //             </button>
// //           </p>
// //         )}
// //       </div>
// //     </section>
// //   );
// // }

// // /* ──────────────────────────────────────────────
// //    Animated Stat Component
// // ────────────────────────────────────────────── */
// // function AnimatedStat({ value, label, bg, color }) {
// //   // Parse the numeric part
// //   const numeric = parseInt(value);
// //   const suffix = value.replace(/[0-9]/g, ''); // e.g., 'K+', '%', ''
// //   const count = useCountUp(numeric, 2000, true);

// //   return (
// //     <div
// //       className="rounded-2xl p-5 border border-[#e2e8f0]"
// //       style={{ backgroundColor: bg }}
// //     >
// //       <p className="text-3xl font-bold mb-1" style={{ color }}>
// //         {count}{suffix}
// //       </p>
// //       <p className="text-xs font-semibold text-gray-500">{label}</p>
// //     </div>
// //   );
// // }

// // /* ──────────────────────────────────────────────
// //    AboutSection with animated counters
// // ────────────────────────────────────────────── */
// // function AboutSection() {
// //   return (
// //     <section id="about" className="py-20 bg-[#f8fafc]">
// //       <div className="max-w-5xl mx-auto px-4">
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
// //           <div>
// //             <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#1a56db] text-xs font-bold tracking-wider uppercase mb-4 border border-blue-100">
// //               About us
// //             </span>
// //             <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-5 leading-tight">
// //               Tanzania's most trusted<br /> lost &amp; found platform
// //             </h2>
// //             <p className="text-gray-500 leading-relaxed mb-4">
// //               PataChako connects people who have lost items with verified
// //               organisations that have found them. Our AI-powered matching
// //               system compares thousands of reports in seconds.
// //             </p>
// //             <p className="text-gray-500 leading-relaxed">
// //               We partner with verified organisations across all 29 regions of
// //               Tanzania — from Dar es Salaam to Zanzibar — so no matter where
// //               you lost it, we can help you find it.
// //             </p>
// //           </div>
// //           <div className="grid grid-cols-2 gap-4">
// //             <AnimatedStat value="50" label="Items recovered" bg="#eff6ff" color="#1a56db" />
// //             <AnimatedStat value="200" label="Partner organisations" bg="#f0fdf4" color="#10b981" />
// //             <AnimatedStat value="29" label="Regions covered" bg="#fef9c3" color="#b45309" />
// //             <AnimatedStat value="98" label="Customer satisfaction" bg="#fce7f3" color="#db2777" />
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// // /* ──────────────────────────────────────────────
// //    HomePage (main export) – NO floating button
// // ────────────────────────────────────────────── */
// // export default function HomePage() {
// //   const navigate = useNavigate();
// //   const { user, logout, loggingOut, isOwner: checkIsOwner } = useAuth();

// //   const storedUser = (() => {
// //     try { return JSON.parse(localStorage.getItem('user') || '{}'); }
// //     catch { return {}; }
// //   })();
// //   const isOwner = !!(
// //     user && (
// //       (typeof checkIsOwner === 'function' ? checkIsOwner() : false) ||
// //       storedUser.user_type === 'OWNER' ||
// //       user.role === 'OWNER' ||
// //       user.userType === 'OWNER'
// //     )
// //   );

// //   const [showModal, setShowModal] = useState(false);

// //   return (
// //     <div className="min-h-screen flex flex-col font-sans">
// //       <Navbar />

// //       <main className="flex-grow">
// //         <Hero />
// //         <TrustStats />
// //         <HowItWorks />
// //         <Categories />
// //         <WhyChoose />
// //         <Testimonials />
// //         <FAQ />

// //         {/* CTA with linked Search & Report buttons */}
// //         <HomeCTA
// //           isOwner={isOwner}
// //           onReportClick={() => setShowModal(true)}
// //         />

// //         <AboutSection />
// //       </main>

// //       <Footer />

// //       {/* Report modal (triggered only by CTA button, no floating button) */}
// //       {showModal && (
// //         <ReportItemModal
// //           onClose={() => setShowModal(false)}
// //           onSuccess={() => setShowModal(false)}
// //         />
// //       )}
// //     </div>
// //   );
// // }

// // src/pages/owner/SearchItems.jsx

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Search, AlertCircle, RefreshCw, FileText, Megaphone, ArrowLeft,
//   Smartphone, Laptop, FileText as DocIcon, CreditCard, BookOpen,
//   ShoppingBag, Wallet, Key, Headphones, Shirt, Gem, Watch,
//   Banknote, Car, Zap, Droplets, Baby, Heart, Dog, UtensilsCrossed,
//   Umbrella, Package, Globe
// } from 'lucide-react';
// import { searchPublicItems } from '../../api/items';
// import { useAuth } from '../../context/AuthContext';
// import Button from '../../components/shared/Button';

// /* ── Region enum ─────────────────────────────────────────────── */
// const REGIONS = [
//   'ARUSHA','DAR_ES_SALAAM','DODOMA','GEITA','IRINGA','KAGERA','KATAVI',
//   'KIGOMA','KILIMANJARO','LINDI','MANYARA','MARA','MBEYA','MOROGORO',
//   'MTWARA','MWANZA','NJOMBE','PWANI','RUKWA','RUVUMA','SHINYANGA',
//   'SIMIYU','SINGIDA','TABORA','TANGA','UNGUJA_KASKAZINI','UNGUJA_KUSINI',
//   'UNGUJA_MJINI_MAGHARIBI','PEMBA',
// ];

// /* ── Category → { icon, bg, color } map ─────────────────────── */
// const CATEGORY_ICON_MAP = {
//   PHONES:           { icon: Smartphone,      bg: '#dbeafe', color: '#1d4ed8' },
//   LAPTOPS:          { icon: Laptop,          bg: '#ede9fe', color: '#7c3aed' },
//   DOCUMENTS:        { icon: DocIcon,         bg: '#fef9c3', color: '#b45309' },
//   IDS:              { icon: CreditCard,      bg: '#fef9c3', color: '#b45309' },
//   PASSPORTS:        { icon: Globe,           bg: '#fef9c3', color: '#b45309' },
//   BAGS:             { icon: ShoppingBag,     bg: '#f3e8ff', color: '#9333ea' },
//   WALLETS:          { icon: Wallet,          bg: '#dcfce7', color: '#15803d' },
//   KEYS:             { icon: Key,             bg: '#ffedd5', color: '#c2410c' },
//   ELECTRONICS:      { icon: Zap,             bg: '#e0f2fe', color: '#0369a1' },
//   CLOTHES:          { icon: Shirt,           bg: '#fce7f3', color: '#be185d' },
//   JEWELRY:          { icon: Gem,             bg: '#fdf4ff', color: '#a21caf' },
//   WATCHES:          { icon: Watch,           bg: '#fdf4ff', color: '#a21caf' },
//   MONEY:            { icon: Banknote,        bg: '#dcfce7', color: '#15803d' },
//   BOOKS:            { icon: BookOpen,        bg: '#fef3c7', color: '#d97706' },
//   VEHICLE_ITEMS:    { icon: Car,             bg: '#f1f5f9', color: '#475569' },
//   HEADPHONES:       { icon: Headphones,      bg: '#dbeafe', color: '#1d4ed8' },
//   CHARGERS_PHONE:   { icon: Smartphone,      bg: '#e0f2fe', color: '#0369a1' },
//   CHARGERS_OTHERS:  { icon: Zap,             bg: '#e0f2fe', color: '#0369a1' },
//   WATER_BOTTLES:    { icon: Droplets,        bg: '#e0f2fe', color: '#0284c7' },
//   TOYS:             { icon: Baby,            bg: '#fce7f3', color: '#db2777' },
//   MEDICAL_ITEMS:    { icon: Heart,           bg: '#fee2e2', color: '#dc2626' },
//   SPORTS_ITEMS:     { icon: Heart,           bg: '#dcfce7', color: '#16a34a' },
//   PET_ITEMS:        { icon: Dog,             bg: '#fef9c3', color: '#ca8a04' },
//   FOOD_CONTAINERS:  { icon: UtensilsCrossed, bg: '#ffedd5', color: '#ea580c' },
//   UMBRELLAS:        { icon: Umbrella,        bg: '#e0f2fe', color: '#0369a1' },
//   OTHERS:           { icon: Package,         bg: '#f1f5f9', color: '#475569' },
// };

// const DEFAULT_CATEGORY = { icon: Package, bg: '#f1f5f9', color: '#475569' };

// /* ── Skeleton card ───────────────────────────────────────────── */
// function SkeletonCard() {
//   return (
//     <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden">
//       <div
//         className="h-44"
//         style={{
//           background: 'linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)',
//           backgroundSize: '400px 100%',
//           animation: 'shimmer 1.4s ease-in-out infinite',
//         }}
//       />
//       <div className="p-4 space-y-2">
//         <div className="h-4 w-3/4 rounded bg-gray-100" style={{ animation: 'shimmer 1.4s ease-in-out infinite' }} />
//         <div className="h-3 w-1/2 rounded bg-gray-100" style={{ animation: 'shimmer 1.4s ease-in-out 0.2s infinite' }} />
//       </div>
//     </div>
//   );
// }

// /* ── Category placeholder ────────────────────────────────────── */
// function CategoryPlaceholder({ category }) {
//   const cfg = CATEGORY_ICON_MAP[category] || DEFAULT_CATEGORY;
//   const IconComp = cfg.icon;
//   return (
//     <div
//       className="w-full h-full flex flex-col items-center justify-center gap-2"
//       style={{ backgroundColor: cfg.bg }}
//     >
//       <IconComp
//         size={44}
//         strokeWidth={1.4}
//         style={{ color: cfg.color }}
//         aria-hidden="true"
//       />
//       <span
//         className="text-xs font-semibold tracking-wide"
//         style={{ color: cfg.color, opacity: 0.75 }}
//       >
//         {(category || 'ITEM').replace(/_/g, ' ')}
//       </span>
//     </div>
//   );
// }

// /* ── Item card ───────────────────────────────────────────────── */
// function ItemCard({ item }) {
//   const [imgError, setImgError] = useState(false);
//   const showPlaceholder = !item.previewImage || imgError;

//   return (
//     <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden
//                     transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
//       <div className="h-44 overflow-hidden">
//         {!showPlaceholder ? (
//           <img
//             src={item.previewImage}
//             alt={item.itemName}
//             className="w-full h-full object-cover"
//             onError={() => setImgError(true)}
//           />
//         ) : (
//           <CategoryPlaceholder category={item.category} />
//         )}
//       </div>
//       <div className="p-4">
//         <h3 className="text-sm font-semibold text-[#0f172a] truncate">
//           {item.itemName || 'Unnamed Item'}
//         </h3>
//         {item.category && (
//           <p className="text-xs text-gray-400 mt-0.5 truncate">
//             {item.category.replace(/_/g, ' ')}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ── Main page ───────────────────────────────────────────────── */
// export default function SearchItems() {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const stored   = JSON.parse(localStorage.getItem('user') || '{}');
//   const userName = stored.name || user?.name || 'User';
//   const firstName = userName.split(' ')[0];

//   const [region,   setRegion]   = useState('');
//   const [items,    setItems]    = useState([]);
//   const [loading,  setLoading]  = useState(false);
//   const [error,    setError]    = useState('');
//   const [searched, setSearched] = useState(false);

//   const handleSearch = async () => {
//     try {
//       setLoading(true);
//       setError('');
//       setSearched(true);
//       const result = await searchPublicItems({
//         region: region || undefined,
//         page: 0,
//         size: 20,
//       });
//       setItems(result?.data?.content ?? result?.content ?? []);
//     } catch (err) {
//       setError('Unable to load items. Please try again.');
//       setItems([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <style>{`
//         @keyframes shimmer {
//           0%   { background-position: -400px 0; }
//           100% { background-position:  400px 0; }
//         }
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(10px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         .fade-up { animation: fadeUp 0.35s ease-out forwards; }
//       `}</style>

//       <div className="min-h-screen bg-[#f8fafc] flex flex-col">

//         {/* ── Scrollable content ─────────────────────────────── */}
//         <div className="flex-1 pb-32">
//           <div className="max-w-7xl mx-auto px-4 py-8">

//             {/* ── Top row ──────────────────────────────────────── */}
//             <div className="flex items-center justify-between mb-8 gap-4">
//               {/* Back button + greeting */}
//               <div className="flex items-center gap-3 min-w-0">
//                 <button
//                   onClick={() => navigate('/')}
//                   aria-label="Back to home"
//                   className="shrink-0 w-10 h-10 flex items-center justify-center
//                              rounded-xl border border-[#e2e8f0] bg-white text-gray-500
//                              hover:text-[#0f172a] hover:bg-gray-50 hover:border-gray-300
//                              transition-all active:scale-95"
//                 >
//                   <ArrowLeft size={18} />
//                 </button>

//                 <div className="min-w-0">
//                   <h1 className="text-xl sm:text-2xl font-bold text-[#0f172a] truncate">
//                     Hi, {firstName}! 👋
//                   </h1>
//                   <p className="text-sm text-gray-500 mt-0.5 hidden sm:block">
//                     Search for found items across Tanzania
//                   </p>
//                 </div>
//               </div>

//               {/* My Reports */}
//               <Button
//                 variant="primary"
//                 onClick={() => navigate('/owner/reports')}
//                 className="shrink-0"
//               >
//                 <FileText size={16} className="mr-1.5" />
//                 My Reports
//               </Button>
//             </div>

//             {/* ── Filter bar ───────────────────────────────────── */}
//             <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-sm mb-8">
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <div className="flex-1">
//                   <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
//                     Filter by region
//                   </label>
//                   <select
//                     value={region}
//                     onChange={(e) => setRegion(e.target.value)}
//                     onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
//                     className="w-full px-4 py-2.5 rounded-xl border border-[#e2e8f0]
//                                focus:ring-2 focus:ring-[#1a56db]/20 focus:border-[#1a56db]
//                                outline-none bg-white text-gray-800 text-sm transition-all"
//                   >
//                     <option value="">All Regions</option>
//                     {REGIONS.map((r) => (
//                       <option key={r} value={r}>{r.replace(/_/g, ' ')}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="sm:self-end">
//                   <button
//                     onClick={handleSearch}
//                     disabled={loading}
//                     className="w-full sm:w-auto flex items-center justify-center gap-2
//                                px-6 py-2.5 rounded-xl bg-[#1a56db] text-white font-semibold
//                                text-sm transition-all hover:bg-[#1547c0] active:scale-95
//                                disabled:opacity-70 disabled:cursor-not-allowed"
//                     style={{ minWidth: 140 }}
//                   >
//                     {loading ? (
//                       <><RefreshCw size={15} className="animate-spin" /> Searching...</>
//                     ) : (
//                       <><Search size={15} /> Search</>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* ── Error ────────────────────────────────────────── */}
//             {error && (
//               <div className="flex items-center gap-3 bg-red-50 border border-red-200
//                               text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
//                 <AlertCircle size={16} className="shrink-0" />
//                 <span className="flex-1">{error}</span>
//                 <button
//                   onClick={handleSearch}
//                   className="text-xs font-semibold underline hover:no-underline shrink-0"
//                 >
//                   Retry
//                 </button>
//               </div>
//             )}

//             {/* ── Skeleton ─────────────────────────────────────── */}
//             {loading && (
//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
//                 {Array.from({ length: 10 }).map((_, i) => (
//                   <SkeletonCard key={i} />
//                 ))}
//               </div>
//             )}

//             {/* ── Results ──────────────────────────────────────── */}
//             {!loading && items.length > 0 && (
//               <div className="fade-up">
//                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
//                   {items.length} item{items.length !== 1 ? 's' : ''} found
//                   {region ? ` in ${region.replace(/_/g, ' ')}` : ' across all regions'}
//                 </p>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
//                   {items.map((item, i) => (
//                     <div
//                       key={item.id}
//                       className="fade-up"
//                       style={{ animationDelay: `${i * 25}ms` }}
//                     >
//                       <ItemCard item={item} />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* ── Empty state ───────────────────────────────────── */}
//             {!loading && searched && items.length === 0 && !error && (
//               <div className="flex flex-col items-center justify-center py-20
//                               bg-white border border-dashed border-[#e2e8f0]
//                               rounded-2xl text-center px-4 fade-up">
//                 <div className="w-14 h-14 rounded-full bg-[#f8fafc] border border-[#e2e8f0]
//                                 flex items-center justify-center mb-4">
//                   <Search size={26} className="text-gray-300" />
//                 </div>
//                 <h3 className="text-base font-bold text-[#0f172a] mb-1">
//                   No items found
//                 </h3>
//                 <p className="text-sm text-gray-500 max-w-xs">
//                   Try a different region or check back later.
//                 </p>
//               </div>
//             )}

//             {/* ── Idle state ────────────────────────────────────── */}
//             {!loading && !searched && !error && (
//               <div className="flex flex-col items-center justify-center py-24
//                               bg-white border border-[#e2e8f0] rounded-2xl
//                               text-center px-4 fade-up">
//                 <div className="w-16 h-16 rounded-full bg-[#eff6ff] border border-[#bfdbfe]
//                                 flex items-center justify-center mb-4">
//                   <Search size={28} className="text-[#1a56db]" />
//                 </div>
//                 <h3 className="text-lg font-bold text-[#0f172a] mb-1">
//                   Find a reported item
//                 </h3>
//                 <p className="text-sm text-gray-500 max-w-sm">
//                   Select a region and click Search to browse found items in your area.
//                 </p>
//               </div>
//             )}

//           </div>
//         </div>

//         {/* ── Fixed bottom CTA bar ─────────────────────────────── */}
//         <div
//           className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#e2e8f0]
//                      py-4 px-4"
//           style={{ backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)' }}
//         >
//           <div className="max-w-3xl mx-auto flex flex-col sm:flex-row
//                           items-center justify-center gap-3">
//             <div className="flex items-center gap-2 text-[#0f172a] font-semibold text-sm sm:text-base">
//               <Megaphone size={20} className="text-[#1a56db] shrink-0" />
//               <span>Lost something? Let our AI find it for you.</span>
//             </div>
//             <Button
//               variant="primary"
//               onClick={() => navigate('/owner/report')}
//               className="whitespace-nowrap shrink-0"
//             >
//               <Megaphone size={16} className="mr-1.5" />
//               Report Lost Item
//             </Button>
//           </div>
//         </div>

//       </div>
//     </>
//   );
// }

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, AlertCircle, RefreshCw, FileText, Megaphone, ArrowLeft,
  Smartphone, Laptop, FileText as DocIcon, CreditCard, BookOpen,
  ShoppingBag, Wallet, Key, Headphones, Shirt, Gem, Watch,
  Banknote, Car, Zap, Droplets, Baby, Heart, Dog, UtensilsCrossed,
  Umbrella, Package, Globe
} from 'lucide-react';
import { searchPublicItems } from '../../api/items';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/shared/Button';

/* ── Region enum ─────────────────────────────────────────────── */
const REGIONS = [
  'ARUSHA','DAR_ES_SALAAM','DODOMA','GEITA','IRINGA','KAGERA','KATAVI',
  'KIGOMA','KILIMANJARO','LINDI','MANYARA','MARA','MBEYA','MOROGORO',
  'MTWARA','MWANZA','NJOMBE','PWANI','RUKWA','RUVUMA','SHINYANGA',
  'SIMIYU','SINGIDA','TABORA','TANGA','UNGUJA_KASKAZINI','UNGUJA_KUSINI',
  'UNGUJA_MJINI_MAGHARIBI','PEMBA',
];

/* ── Category → { icon, bg, color } map ─────────────────────── */
const CATEGORY_ICON_MAP = {
  PHONES:           { icon: Smartphone,      bg: '#dbeafe', color: '#1d4ed8' },
  LAPTOPS:          { icon: Laptop,          bg: '#ede9fe', color: '#7c3aed' },
  DOCUMENTS:        { icon: DocIcon,         bg: '#fef9c3', color: '#b45309' },
  IDS:              { icon: CreditCard,      bg: '#fef9c3', color: '#b45309' },
  PASSPORTS:        { icon: Globe,           bg: '#fef9c3', color: '#b45309' },
  BAGS:             { icon: ShoppingBag,     bg: '#f3e8ff', color: '#9333ea' },
  WALLETS:          { icon: Wallet,          bg: '#dcfce7', color: '#15803d' },
  KEYS:             { icon: Key,             bg: '#ffedd5', color: '#c2410c' },
  ELECTRONICS:      { icon: Zap,             bg: '#e0f2fe', color: '#0369a1' },
  CLOTHES:          { icon: Shirt,           bg: '#fce7f3', color: '#be185d' },
  JEWELRY:          { icon: Gem,             bg: '#fdf4ff', color: '#a21caf' },
  WATCHES:          { icon: Watch,           bg: '#fdf4ff', color: '#a21caf' },
  MONEY:            { icon: Banknote,        bg: '#dcfce7', color: '#15803d' },
  BOOKS:            { icon: BookOpen,        bg: '#fef3c7', color: '#d97706' },
  VEHICLE_ITEMS:    { icon: Car,             bg: '#f1f5f9', color: '#475569' },
  HEADPHONES:       { icon: Headphones,      bg: '#dbeafe', color: '#1d4ed8' },
  CHARGERS_PHONE:   { icon: Smartphone,      bg: '#e0f2fe', color: '#0369a1' },
  CHARGERS_OTHERS:  { icon: Zap,             bg: '#e0f2fe', color: '#0369a1' },
  WATER_BOTTLES:    { icon: Droplets,        bg: '#e0f2fe', color: '#0284c7' },
  TOYS:             { icon: Baby,            bg: '#fce7f3', color: '#db2777' },
  MEDICAL_ITEMS:    { icon: Heart,           bg: '#fee2e2', color: '#dc2626' },
  SPORTS_ITEMS:     { icon: Heart,           bg: '#dcfce7', color: '#16a34a' },
  PET_ITEMS:        { icon: Dog,             bg: '#fef9c3', color: '#ca8a04' },
  FOOD_CONTAINERS:  { icon: UtensilsCrossed, bg: '#ffedd5', color: '#ea580c' },
  UMBRELLAS:        { icon: Umbrella,        bg: '#e0f2fe', color: '#0369a1' },
  OTHERS:           { icon: Package,         bg: '#f1f5f9', color: '#475569' },
};

const DEFAULT_CATEGORY = { icon: Package, bg: '#f1f5f9', color: '#475569' };

/* ── Skeleton card ───────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden">
      <div
        className="h-44"
        style={{
          background: 'linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)',
          backgroundSize: '400px 100%',
          animation: 'shimmer 1.4s ease-in-out infinite',
        }}
      />
      <div className="p-4 space-y-2">
        <div className="h-4 w-3/4 rounded bg-gray-100" style={{ animation: 'shimmer 1.4s ease-in-out infinite' }} />
        <div className="h-3 w-1/2 rounded bg-gray-100" style={{ animation: 'shimmer 1.4s ease-in-out 0.2s infinite' }} />
      </div>
    </div>
  );
}

/* ── Item card – category icon & label only, no image or name ─ */
function ItemCard({ item }) {
  const cfg = CATEGORY_ICON_MAP[item.category] || DEFAULT_CATEGORY;
  const IconComp = cfg.icon;

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden
                    transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <div
        className="h-44 flex flex-col items-center justify-center gap-2"
        style={{ backgroundColor: cfg.bg }}
      >
        <IconComp size={44} strokeWidth={1.4} style={{ color: cfg.color }} />
        <span
          className="text-xs font-semibold tracking-wide"
          style={{ color: cfg.color, opacity: 0.75 }}
        >
          {(item.category || 'ITEM').replace(/_/g, ' ')}
        </span>
      </div>
    </div>
  );
}

/* ── Main page ───────────────────────────────────────────────── */
export default function SearchItems() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const stored   = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = stored.name || user?.name || 'User';
  const firstName = userName.split(' ')[0];

  const [region,   setRegion]   = useState('');
  const [items,    setItems]    = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError('');
      setSearched(true);
      const result = await searchPublicItems({
        region: region || undefined,
        page: 0,
        size: 20,
      });
      setItems(result?.data?.content ?? result?.content ?? []);
    } catch (err) {
      setError('Unable to load items. Please try again.');
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.35s ease-out forwards; }
      `}</style>

      <div className="min-h-screen bg-[#f8fafc] flex flex-col">

        {/* ── Scrollable content ─────────────────────────────── */}
        <div className="flex-1 pb-32">
          <div className="max-w-7xl mx-auto px-4 py-8">

            {/* ── Top row ──────────────────────────────────────── */}
            <div className="flex items-center justify-between mb-8 gap-4">
              {/* Back button + greeting */}
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => navigate('/')}
                  aria-label="Back to home"
                  className="shrink-0 w-10 h-10 flex items-center justify-center
                             rounded-xl border border-[#e2e8f0] bg-white text-gray-500
                             hover:text-[#0f172a] hover:bg-gray-50 hover:border-gray-300
                             transition-all active:scale-95"
                >
                  <ArrowLeft size={18} />
                </button>

                <div className="min-w-0">
                  <h1 className="text-xl sm:text-2xl font-bold text-[#0f172a] truncate">
                    Hi, {firstName}! 👋
                  </h1>
                  <p className="text-sm text-gray-500 mt-0.5 hidden sm:block">
                    Search for found items across Tanzania
                  </p>
                </div>
              </div>

              {/* My Reports */}
              <Button
                variant="primary"
                onClick={() => navigate('/owner/reports')}
                className="shrink-0"
              >
                <FileText size={16} className="mr-1.5" />
                My Reports
              </Button>
            </div>

            {/* ── Filter bar ───────────────────────────────────── */}
            <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 shadow-sm mb-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Filter by region
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e2e8f0]
                               focus:ring-2 focus:ring-[#1a56db]/20 focus:border-[#1a56db]
                               outline-none bg-white text-gray-800 text-sm transition-all"
                  >
                    <option value="">All Regions</option>
                    {REGIONS.map((r) => (
                      <option key={r} value={r}>{r.replace(/_/g, ' ')}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:self-end">
                  <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="w-full sm:w-auto flex items-center justify-center gap-2
                               px-6 py-2.5 rounded-xl bg-[#1a56db] text-white font-semibold
                               text-sm transition-all hover:bg-[#1547c0] active:scale-95
                               disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ minWidth: 140 }}
                  >
                    {loading ? (
                      <><RefreshCw size={15} className="animate-spin" /> Searching...</>
                    ) : (
                      <><Search size={15} /> Search</>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* ── Error ────────────────────────────────────────── */}
            {error && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200
                              text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
                <AlertCircle size={16} className="shrink-0" />
                <span className="flex-1">{error}</span>
                <button
                  onClick={handleSearch}
                  className="text-xs font-semibold underline hover:no-underline shrink-0"
                >
                  Retry
                </button>
              </div>
            )}

            {/* ── Skeleton ─────────────────────────────────────── */}
            {loading && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}

            {/* ── Results ──────────────────────────────────────── */}
            {!loading && items.length > 0 && (
              <div className="fade-up">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                  {items.length} item{items.length !== 1 ? 's' : ''} found
                  {region ? ` in ${region.replace(/_/g, ' ')}` : ' across all regions'}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                  {items.map((item, i) => (
                    <div
                      key={item.id}
                      className="fade-up"
                      style={{ animationDelay: `${i * 25}ms` }}
                    >
                      <ItemCard item={item} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Empty state ───────────────────────────────────── */}
            {!loading && searched && items.length === 0 && !error && (
              <div className="flex flex-col items-center justify-center py-20
                              bg-white border border-dashed border-[#e2e8f0]
                              rounded-2xl text-center px-4 fade-up">
                <div className="w-14 h-14 rounded-full bg-[#f8fafc] border border-[#e2e8f0]
                                flex items-center justify-center mb-4">
                  <Search size={26} className="text-gray-300" />
                </div>
                <h3 className="text-base font-bold text-[#0f172a] mb-1">
                  No items found
                </h3>
                <p className="text-sm text-gray-500 max-w-xs">
                  Try a different region or check back later.
                </p>
              </div>
            )}

            {/* ── Idle state ────────────────────────────────────── */}
            {!loading && !searched && !error && (
              <div className="flex flex-col items-center justify-center py-24
                              bg-white border border-[#e2e8f0] rounded-2xl
                              text-center px-4 fade-up">
                <div className="w-16 h-16 rounded-full bg-[#eff6ff] border border-[#bfdbfe]
                                flex items-center justify-center mb-4">
                  <Search size={28} className="text-[#1a56db]" />
                </div>
                <h3 className="text-lg font-bold text-[#0f172a] mb-1">
                  Find a reported item
                </h3>
                <p className="text-sm text-gray-500 max-w-sm">
                  Select a region and click Search to browse found items in your area.
                </p>
              </div>
            )}

          </div>
        </div>

        {/* ── Fixed bottom CTA bar ─────────────────────────────── */}
        <div
          className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#e2e8f0]
                     py-4 px-4"
          style={{ backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)' }}
        >
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row
                          items-center justify-center gap-3">
            <div className="flex items-center gap-2 text-[#0f172a] font-semibold text-sm sm:text-base">
              <Megaphone size={20} className="text-[#1a56db] shrink-0" />
              <span>Lost something? Let our AI find it for you.</span>
            </div>
            <Button
              variant="primary"
              onClick={() => navigate('/owner/report')}
              className="whitespace-nowrap shrink-0"
            >
              <Megaphone size={16} className="mr-1.5" />
              Report Lost Item
            </Button>
          </div>
        </div>

      </div>
    </>
  );
}