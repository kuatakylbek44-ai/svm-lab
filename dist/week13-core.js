(() => {
  'use strict';
  const S=(name,shape,kind='conv',note='')=>({name,shape,kind,note});
  const models={
    lenet:{name:'LeNet-5',year:1998,depth:7,input:'32 × 32 × 1',stages:[
      S('Input',[32,32,1],'input'),S('C1 · 5×5 · 6',[28,28,6]),S('S2 · 2×2',[14,14,6],'pool'),
      S('C3 · 5×5 · 16',[10,10,16]),S('S4 · 2×2',[5,5,16],'pool'),S('C5 · 5×5 · 120',[1,1,120]),
      S('F6 · 84',[84],'dense'),S('Output · 10',[10],'output')
    ]},
    alexnet:{name:'AlexNet',year:2012,depth:8,input:'227 × 227 × 3',stages:[
      S('Input',[227,227,3],'input'),S('Conv1 · 11×11 / 4',[55,55,96]),S('MaxPool · 3×3 / 2',[27,27,96],'pool'),
      S('Conv2 · 5×5',[27,27,256]),S('MaxPool · 3×3 / 2',[13,13,256],'pool'),S('Conv3 · 3×3',[13,13,384]),
      S('Conv4 · 3×3',[13,13,384]),S('Conv5 · 3×3',[13,13,256]),S('MaxPool · 3×3 / 2',[6,6,256],'pool'),
      S('Flatten',[9216],'flatten'),S('Dense · 4096',[4096],'dense'),S('Dense · 4096',[4096],'dense'),S('Softmax · 1000',[1000],'output')
    ]},
    vgg:{name:'VGG16',year:2014,depth:16,input:'224 × 224 × 3',stages:[
      S('Input',[224,224,3],'input'),S('2 × Conv 3×3 · 64',[224,224,64]),S('MaxPool',[112,112,64],'pool'),
      S('2 × Conv 3×3 · 128',[112,112,128]),S('MaxPool',[56,56,128],'pool'),S('3 × Conv 3×3 · 256',[56,56,256]),
      S('MaxPool',[28,28,256],'pool'),S('3 × Conv 3×3 · 512',[28,28,512]),S('MaxPool',[14,14,512],'pool'),
      S('3 × Conv 3×3 · 512',[14,14,512]),S('MaxPool',[7,7,512],'pool'),S('Flatten',[25088],'flatten'),
      S('Dense · 4096',[4096],'dense'),S('Dense · 4096',[4096],'dense'),S('Softmax · 1000',[1000],'output')
    ]},
    inception:{name:'GoogLeNet',year:2014,depth:22,input:'224 × 224 × 3',stages:[
      S('Input',[224,224,3],'input'),S('Conv · 7×7 / 2',[112,112,64]),S('MaxPool',[56,56,64],'pool'),
      S('Conv · 1×1 + 3×3',[56,56,192]),S('MaxPool',[28,28,192],'pool'),
      S('Inception 3a',[28,28,256],'concat'),S('Inception 3b',[28,28,480],'concat'),S('MaxPool',[14,14,480],'pool'),
      S('Inception 4a',[14,14,512],'concat'),S('Inception 4b',[14,14,512],'concat'),S('Inception 4c',[14,14,512],'concat'),
      S('Inception 4d',[14,14,528],'concat'),S('Inception 4e',[14,14,832],'concat'),S('MaxPool',[7,7,832],'pool'),
      S('Inception 5a',[7,7,832],'concat'),S('Inception 5b',[7,7,1024],'concat'),S('Global average pool',[1024],'pool'),S('Softmax · 1000',[1000],'output')
    ]},
    resnet:{name:'ResNet-50',year:2015,depth:50,input:'224 × 224 × 3',stages:[
      S('Input',[224,224,3],'input'),S('Conv · 7×7 / 2',[112,112,64]),S('MaxPool',[56,56,64],'pool'),
      S('3 × residual block',[56,56,256],'add'),S('4 × residual block',[28,28,512],'add'),
      S('6 × residual block',[14,14,1024],'add'),S('3 × residual block',[7,7,2048],'add'),
      S('Global average pool',[2048],'pool'),S('Softmax · 1000',[1000],'output')
    ]}
  };
  function vggWeights(channels){return {wide:7*7*channels*channels,small:3*3*channels*channels*3};}
  function inceptionWeights(reduce=true){
    const branch=[192*64,reduce?192*96+9*96*128:9*192*128,reduce?192*16+25*16*32:25*192*32,192*32];
    return {branch,total:branch.reduce((a,b)=>a+b,0),channels:64+128+32+32};
  }
  function residual(x,f,shortcut=true){const sum=f+(shortcut?x:0);return {sum,output:Math.max(0,sum)};}
  window.CNN13={models,vggWeights,inceptionWeights,residual};
})();

