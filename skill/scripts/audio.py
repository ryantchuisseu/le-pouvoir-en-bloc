import numpy as np, json, wave, sys, os
os.chdir(sys.argv[1] if len(sys.argv)>1 else '.')
SR=44100; shots=json.load(open('shots.json')); TOT=shots[-1]['t0']+shots[-1]['d']
N=int(SR*(TOT+.2)); L=np.zeros(N); R=np.zeros(N); rng=np.random.default_rng(1)
def add(sig,t,pan=0.,g=1.):
    i=int(t*SR); s=sig[:max(0,min(len(sig),N-i))]*g; L[i:i+len(s)]+=s*(1-max(0,pan)); R[i:i+len(s)]+=s*(1+min(0,pan))
def env(n,a=.005,r=.2):
    t=np.arange(n)/SR; return np.minimum(1,t/a)*np.exp(-t/r)
def tone(f,d,kind='saw',a=.005,r=.3):
    n=int(d*SR); t=np.arange(n)/SR
    if kind=='saw': x=2*((t*f)%1)-1
    elif kind=='sq': x=np.sign(np.sin(2*np.pi*f*t))
    else: x=np.sin(2*np.pi*f*t)
    return x*env(n,a,r)
def lp(x,k=.1):
    y=np.zeros_like(x); acc=0.
    for i in range(len(x)): acc+=k*(x[i]-acc); y[i]=acc
    return y
def kick():
    n=int(.35*SR); t=np.arange(n)/SR; f=50+90*np.exp(-t*30); return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*9)
def hat(): n=int(.05*SR); return rng.standard_normal(n)*np.exp(-np.arange(n)/SR*90)*.5
def snare(): n=int(.2*SR); t=np.arange(n)/SR; return (rng.standard_normal(n)*.6+np.sin(2*np.pi*190*t)*.5)*np.exp(-t*18)
mid=lambda m:440*2**((m-69)/12)
BPM=100; beat=60/BPM
dark=next((x['t0'] for x in shots if x.get('mood')=='dark'),shots[min(4,len(shots)-1)]['t0'])
final=next((x['t0'] for x in shots if x.get('mood')=='final'),shots[-1]['t0'])
prog=[(38,[50,53,57]),(34,[46,50,53]),(31,[43,46,50]),(33,[45,49,52])]   # Dm Bb Gm A
progF=[(41,[53,57,60]),(36,[48,52,55])]                                  # F C
b=0; t=0.
while t<TOT:
    bar=int(b//4)
    root,ch=(progF[(bar)%2] if t>=final else prog[(bar//1)%4])
    if t<TOT-.3:
        add(kick(),t,g=.55 if t<dark else .7)
        if b%2==1: add(snare(),t,g=.18 if t<dark else .28)
        for e in (0,.5): add(hat(),t+e*beat,pan=.3,g=.12)
        for e in (0,.5):  # bass 8ths
            add(lp(tone(mid(root),beat*.48,'saw',r=.15),.08),t+e*beat,g=.32)
        if b%4==0:  # pad
            for m in ch: add(lp(tone(mid(m),beat*4,'saw',a=.3,r=2.5),.03),t,pan=-.2,g=.07)
            if t>=dark and t<final: add(tone(mid(root-12),beat*4,'sine',a=.1,r=3),t,g=.25)
        # plucky arpeggio
        m=ch[b%3]+12; add(lp(tone(mid(m),.25,'sq',r=.09),.15),t+.5*beat,pan=.25,g=.05 if t<final else .08)
    b+=1; t+=beat
# SFX
def whoosh(d=.35):
    n=int(d*SR); x=rng.standard_normal(n); e=np.sin(np.linspace(0,np.pi,n))**2
    return lp(x,.06)*e*1.5
def thud():
    n=int(.6*SR); t=np.arange(n)/SR; return (np.sin(2*np.pi*(60+40*np.exp(-t*20))*t)*np.exp(-t*6)*1.2+lp(rng.standard_normal(n),.2)*np.exp(-t*25))
def pop():
    n=int(.08*SR); t=np.arange(n)/SR; return np.sin(2*np.pi*(900-5000*t)*t)*np.exp(-t*50)
def clang():
    n=int(1.0*SR); t=np.arange(n)/SR; return sum(np.sin(2*np.pi*f*t)*np.exp(-t*k) for f,k in [(523,4),(1290,6),(2210,9),(3100,12)])*.3
def chime(): 
    out=np.zeros(int(1.2*SR))
    for i,m in enumerate([72,76,79,84]):
        s=tone(mid(m),.8,'sine',r=.3); j=int(i*.08*SR); out[j:j+len(s)]+=s[:len(out)-j]
    return out
def poofs():
    n=int(.4*SR); return lp(rng.standard_normal(n),.25)*np.exp(-np.arange(n)/SR*9)
for s in shots[1:]: add(whoosh(),s['t0']-.18,g=.35)
for s in shots:
    if s['stamp']: add(thud(),s['stamp'],g=.9)
for s in shots:
    c=s.get('ncap',2)
    for k in range(c): add(pop(),s['t0']+k*s['d']/c,g=.25)
def scratch():
    n=int(.32*SR); t=np.arange(n)/SR; f=900*np.exp(-t*9)+120
    return (np.sign(np.sin(2*np.pi*np.cumsum(f)/SR))*.4+rng.standard_normal(n)*.5)*np.exp(-t*7)
def splat():
    n=int(.4*SR); t=np.arange(n)/SR
    return lp(rng.standard_normal(n),.35)*np.exp(-t*14)*1.4+np.sin(2*np.pi*90*t)*np.exp(-t*20)
def boing():
    n=int(.5*SR); t=np.arange(n)/SR; f=220+160*np.sin(2*np.pi*7*t)*np.exp(-t*3)
    return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*4)
def static():
    n=int(1.1*SR); t=np.arange(n)/SR; x=rng.standard_normal(n)
    x=x-lp(x,.15); crack=(rng.random(n)<.002)*rng.standard_normal(n)*6
    return (x*.45+crack)*np.minimum(1,t/.05)*np.minimum(1,(1.1-t)/.15)
def drums():
    out=np.zeros(int(1.4*SR))
    for k,tt in enumerate([0,.18,.36,.54,.63,.72,.9,1.08]):
        s=snare(); j=int(tt*SR); out[j:j+len(s)]+=s[:len(out)-j]*(0.6 if k%3 else 1.0)
    return out
SFX={'static':(static,.45),'drums':(drums,.55),'scratch':(scratch,.7),'splat':(splat,.8),'boing':(boing,.5),'chime':(chime,.35),'clang':(clang,.6),'poof':(poofs,.5),'thud':(thud,.9),'whoosh':(whoosh,.4)}
for s in shots:
    for k,at in s.get('sfx',[]): f,g=SFX[k]; add(f(),at,g=g)
# master
fade=np.ones(N); fl=int(.6*SR); fade[-fl:]=np.linspace(1,0,fl); L*=fade; R*=fade
m=max(np.abs(L).max(),np.abs(R).max()); L=np.tanh(L/m*1.4)*.85; R=np.tanh(R/m*1.4)*.85
data=(np.stack([L,R],1)*32767).astype('<i2')
with wave.open('music.wav','wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(data.tobytes())
print('ok',TOT)
