import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Beef,
  Check,
  ChevronDown,
  Flame,
  Instagram,
  Leaf,
  MapPin,
  Menu,
  Minus,
  Phone,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Target,
  Utensils,
  X,
  Zap
} from 'lucide-react';

const WHATSAPP = '962790137012';

const meals = [
  { id: 1, name: 'Lean Chicken Bowl', category: 'Chicken', price: 5.5, calories: 465, protein: 42, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85' },
  { id: 2, name: 'Protein Beef Plate', category: 'Beef', price: 6.75, calories: 540, protein: 48, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85' },
  { id: 3, name: 'Green Power Salad', category: 'Vegetarian', price: 4.75, calories: 330, protein: 19, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85' },
  { id: 4, name: 'Grilled Salmon Box', category: 'Seafood', price: 8.5, calories: 510, protein: 46, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=85' },
  { id: 5, name: 'Avocado Egg Toast', category: 'Breakfast', price: 4.25, calories: 395, protein: 22, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=85' },
  { id: 6, name: 'Chicken Pesto Pasta', category: 'Chicken', price: 6.25, calories: 590, protein: 45, image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=85' }
];

const plans = [
  { icon: Flame, title: 'Weight Loss', subtitle: 'Calorie-controlled meals designed around your target.', features: ['Personal calorie range', '1–3 meals daily', 'Weekly progress check'] },
  { icon: Target, title: 'Balanced Lifestyle', subtitle: 'Flexible, nutritious meals for busy workdays.', features: ['Balanced macros', 'Flexible meal count', 'Rotating menu'] },
  { icon: Zap, title: 'Muscle Gain', subtitle: 'High-protein plans for training and recovery.', features: ['Protein-first meals', 'Larger portions', 'Training-day options'] }
];

const fade = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: .55 } } };

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState({});
  const [calories, setCalories] = useState(null);
  const [faq, setFaq] = useState(0);

  const categories = ['All', ...new Set(meals.map((m) => m.category))];
  const filtered = useMemo(() => meals.filter((meal) => (category === 'All' || meal.category === category) && meal.name.toLowerCase().includes(query.toLowerCase())), [category, query]);
  const cartItems = meals.filter((meal) => cart[meal.id]).map((meal) => ({ ...meal, qty: cart[meal.id] }));
  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const add = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const remove = (id) => setCart((c) => {
    const next = { ...c };
    if ((next[id] || 0) <= 1) delete next[id]; else next[id] -= 1;
    return next;
  });

  const sendOrder = () => {
    const lines = cartItems.map((item) => `• ${item.name} × ${item.qty}`).join('\n');
    const message = `Hello Fitness Kitchen, I would like to order:\n${lines}\n\nEstimated total: JOD ${total.toFixed(2)}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const calculate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const gender = data.get('gender');
    const age = Number(data.get('age'));
    const weight = Number(data.get('weight'));
    const height = Number(data.get('height'));
    const activity = Number(data.get('activity'));
    const goal = Number(data.get('goal'));
    if (!age || !weight || !height) return;
    const bmr = gender === 'male' ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161;
    setCalories(Math.round(bmr * activity + goal));
  };

  return (
    <div className="app">
      <header className="navbar">
        <a href="#top" className="brand"><span className="brand-mark"><Leaf size={20} /></span><span>FITNESS<br/><b>KITCHEN</b></span></a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href="#menu" onClick={() => setMenuOpen(false)}>Menu</a>
          <a href="#plans" onClick={() => setMenuOpen(false)}>Subscriptions</a>
          <a href="#calculator" onClick={() => setMenuOpen(false)}>Calories</a>
          <a href="#branches" onClick={() => setMenuOpen(false)}>Branches</a>
        </nav>
        <div className="nav-actions">
          <button className="cart-button" onClick={() => setCartOpen(true)} aria-label="Open cart"><ShoppingBag size={20}/>{cartCount > 0 && <span>{cartCount}</span>}</button>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open navigation">{menuOpen ? <X/> : <Menu/>}</button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <motion.div initial="hidden" animate="visible" variants={fade} className="eyebrow"><Sparkles size={16}/> Healthy food. Built around you.</motion.div>
            <motion.h1 initial="hidden" animate="visible" variants={fade}>Eat better.<br/><span>Feel stronger.</span></motion.h1>
            <motion.p initial="hidden" animate="visible" variants={fade}>Balanced meals, clear nutrition and flexible subscriptions—prepared fresh for your routine and your goals.</motion.p>
            <motion.div initial="hidden" animate="visible" variants={fade} className="hero-actions">
              <a className="primary" href="#menu">Explore the menu <ArrowRight size={18}/></a>
              <a className="secondary" href="#plans">View subscriptions</a>
            </motion.div>
            <motion.div initial="hidden" animate="visible" variants={fade} className="hero-stats">
              <div><b>40+</b><span>Fresh options</span></div><div><b>3</b><span>Amman branches</span></div><div><b>7 days</b><span>Weekly service</span></div>
            </motion.div>
          </div>
          <motion.div className="hero-visual" initial={{opacity:0,scale:.94}} animate={{opacity:1,scale:1}} transition={{duration:.7}}>
            <img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1600&q=90" alt="Healthy meal bowl" />
            <div className="nutrition-card"><span><Flame size={17}/> Balanced meal</span><b>465 kcal</b><small>42g protein</small></div>
            <div className="fresh-card"><Leaf size={18}/><span>Freshly prepared<br/><b>every day</b></span></div>
          </motion.div>
        </section>

        <section className="trust-strip"><span>High protein</span><i/> <span>Calculated calories</span><i/> <span>Fresh ingredients</span><i/> <span>Flexible subscriptions</span></section>

        <section className="section" id="menu">
          <motion.div className="section-heading" initial="hidden" whileInView="visible" viewport={{once:true}} variants={fade}>
            <div><span className="kicker">THE MENU</span><h2>Food that fits your day.</h2></div>
            <p>Choose from satisfying meals with clear calories and protein—without compromising on flavor.</p>
          </motion.div>
          <div className="menu-toolbar">
            <div className="categories">{categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
            <label className="search"><Search size={18}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search meals" /></label>
          </div>
          <div className="meal-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((meal) => (
                <motion.article layout key={meal.id} className="meal-card" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
                  <div className="meal-image"><img src={meal.image} alt={meal.name}/><span>{meal.category}</span></div>
                  <div className="meal-content"><h3>{meal.name}</h3><div className="macros"><span><Flame size={15}/>{meal.calories} kcal</span><span><Beef size={15}/>{meal.protein}g protein</span></div><div className="meal-footer"><b>JOD {meal.price.toFixed(2)}</b><button onClick={()=>add(meal.id)}><Plus size={18}/> Add</button></div></div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </section>

        <section className="dark-section" id="plans">
          <div className="section-heading light"><div><span className="kicker">SUBSCRIPTIONS</span><h2>A plan for every goal.</h2></div><p>Pick your direction. We handle the meals, portions and variety.</p></div>
          <div className="plans-grid">{plans.map(({icon:Icon,title,subtitle,features}, index)=><motion.article className="plan-card" key={title} initial="hidden" whileInView="visible" viewport={{once:true}} variants={fade}><div className="plan-icon"><Icon/></div><span className="plan-number">0{index+1}</span><h3>{title}</h3><p>{subtitle}</p><ul>{features.map(f=><li key={f}><Check size={16}/>{f}</li>)}</ul><a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hello, I am interested in the ${title} subscription.`)}`} target="_blank" rel="noreferrer">Ask about this plan <ArrowRight size={17}/></a></motion.article>)}</div>
        </section>

        <section className="calculator-section" id="calculator">
          <div className="calculator-copy"><span className="kicker">CALORIE CALCULATOR</span><h2>Know your daily starting point.</h2><p>Get a quick estimate of your daily calorie needs, then let our team help you choose the right plan.</p><div className="note"><Sparkles size={19}/><span>This result is an estimate for general guidance and is not medical advice.</span></div></div>
          <form className="calculator" onSubmit={calculate}>
            <div className="field wide"><label>Gender</label><div className="gender-options"><label><input type="radio" name="gender" value="female" defaultChecked/><span>Female</span></label><label><input type="radio" name="gender" value="male"/><span>Male</span></label></div></div>
            <div className="field"><label>Age</label><input name="age" type="number" min="15" max="90" placeholder="26" required/></div>
            <div className="field"><label>Weight (kg)</label><input name="weight" type="number" min="35" max="250" placeholder="70" required/></div>
            <div className="field"><label>Height (cm)</label><input name="height" type="number" min="130" max="230" placeholder="170" required/></div>
            <div className="field"><label>Activity</label><select name="activity" defaultValue="1.375"><option value="1.2">Low activity</option><option value="1.375">Light activity</option><option value="1.55">Moderate activity</option><option value="1.725">High activity</option></select></div>
            <div className="field wide"><label>Goal</label><select name="goal" defaultValue="0"><option value="-400">Lose weight</option><option value="0">Maintain weight</option><option value="300">Gain weight</option></select></div>
            <button className="calculate-button" type="submit">Calculate my calories <ArrowRight size={18}/></button>
            {calories && <motion.div className="result" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}><span>Your estimated daily target</span><strong>{calories.toLocaleString()} <small>kcal/day</small></strong></motion.div>}
          </form>
        </section>

        <section className="section why"><div className="why-image"><img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1400&q=90" alt="Fresh healthy ingredients"/></div><div className="why-copy"><span className="kicker">WHY FITNESS KITCHEN</span><h2>Simple nutrition.<br/>Serious flavor.</h2><p>Healthy eating should feel easy, satisfying and realistic. Every detail is designed to help you stay consistent.</p><div className="benefits"><div><span><Utensils/></span><div><h4>Made fresh</h4><p>Prepared daily with quality ingredients.</p></div></div><div><span><Target/></span><div><h4>Clear nutrition</h4><p>Calories and protein shown clearly.</p></div></div><div><span><Zap/></span><div><h4>Built for real life</h4><p>Flexible choices for work, training and home.</p></div></div></div></div></section>

        <section className="branches" id="branches"><div className="section-heading"><div><span className="kicker">OUR BRANCHES</span><h2>Healthy meals, closer to you.</h2></div></div><div className="branch-grid">{['Um Al Summaq','Jubeiha','Marj Al Hamam'].map((branch)=><article key={branch}><MapPin/><h3>{branch}</h3><p>Amman, Jordan</p><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">Order from this branch <ArrowRight size={16}/></a></article>)}</div></section>

        <section className="faq-section"><div><span className="kicker">FAQ</span><h2>Questions, answered.</h2></div><div className="faq-list">{[
          ['Can I customize my subscription?','Yes. Meal count, preferences and goals can be discussed with the team before confirming your plan.'],
          ['Are calories and macros available?','The website can display calories and protein for every approved meal once final data is provided.'],
          ['How do I place an order?','Add meals to your basket and send the complete order directly through WhatsApp.']
        ].map(([q,a],i)=><div className="faq-item" key={q}><button onClick={()=>setFaq(faq===i?-1:i)}><span>{q}</span><ChevronDown className={faq===i?'rotate':''}/></button><AnimatePresence>{faq===i&&<motion.p initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}>{a}</motion.p>}</AnimatePresence></div>)}</div></section>

        <section className="cta"><div><span className="kicker">READY WHEN YOU ARE</span><h2>Your next healthy meal is one message away.</h2></div><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">Order on WhatsApp <ArrowRight/></a></section>
      </main>

      <footer><div className="footer-brand"><div className="brand"><span className="brand-mark"><Leaf size={20}/></span><span>FITNESS<br/><b>KITCHEN</b></span></div><p>Healthy meals made for your goals.</p></div><div><h4>Explore</h4><a href="#menu">Menu</a><a href="#plans">Subscriptions</a><a href="#calculator">Calories</a></div><div><h4>Contact</h4><a href={`tel:+${WHATSAPP}`}><Phone size={15}/> +962 79 013 7012</a><a href="https://www.instagram.com/fitnesskitchenjo" target="_blank" rel="noreferrer"><Instagram size={15}/> fitnesskitchenjo</a></div><div><h4>Hours</h4><p>Daily<br/>8:00 AM – 11:30 PM</p></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Fitness Kitchen Jordan</span><span>Concept website by <b>Koodly</b></span></div></footer>

      <AnimatePresence>{cartOpen&&<><motion.div className="overlay" onClick={()=>setCartOpen(false)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}/><motion.aside className="cart-drawer" initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring',damping:28,stiffness:260}}><div className="cart-head"><div><span>Your order</span><h3>{cartCount} item{cartCount===1?'':'s'}</h3></div><button onClick={()=>setCartOpen(false)}><X/></button></div><div className="cart-items">{cartItems.length===0?<div className="empty-cart"><ShoppingBag/><h4>Your basket is empty</h4><p>Add a few meals from the menu to get started.</p></div>:cartItems.map(item=><div className="cart-item" key={item.id}><img src={item.image} alt=""/><div><h4>{item.name}</h4><span>JOD {item.price.toFixed(2)}</span><div className="qty"><button onClick={()=>remove(item.id)}><Minus size={15}/></button><b>{item.qty}</b><button onClick={()=>add(item.id)}><Plus size={15}/></button></div></div></div>)}</div>{cartItems.length>0&&<div className="cart-footer"><div><span>Estimated total</span><b>JOD {total.toFixed(2)}</b></div><button onClick={sendOrder}>Send order on WhatsApp <ArrowRight size={18}/></button><small>Final availability and total are confirmed by the branch.</small></div>}</motion.aside></>}</AnimatePresence>
    </div>
  );
}

export default App;
