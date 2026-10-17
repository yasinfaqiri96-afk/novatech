import numpy as np, cv2, json
img=np.array([[100,76],[791,136],[917,749],[228,807]],dtype=np.float64)
W,H=0.5916,0.3944
obj=np.array([[-W/2,H/2,0],[W/2,H/2,0],[W/2,-H/2,0],[-W/2,-H/2,0]],dtype=np.float64)
sols=[]
for f in range(1800,8001,400):
  best=None
  for cx in range(-800,2201,50):
    for cy in range(-600,1701,50):
      K=np.array([[f,0,cx],[0,f,cy],[0,0,1]],float)
      ok,rv,tv=cv2.solvePnP(obj,img,K,None,flags=cv2.SOLVEPNP_IPPE)
      p,_=cv2.projectPoints(obj,rv,tv,K,None); e=np.abs(p.reshape(-1,2)-img).max()
      if best is None or e<best[0]: best=(e,cx,cy,rv,tv)
  e,cx,cy,rv,tv=best; R,_=cv2.Rodrigues(rv)
  sols.append({'f':f,'cx':cx,'cy':cy,'R':R.tolist(),'t':tv.ravel().tolist(),'err':e})
  print(f,cx,cy,round(e,3),flush=True)
json.dump(sols,open('pnp.json','w'))
