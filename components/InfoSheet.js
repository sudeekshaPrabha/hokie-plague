import { useEffect, useRef } from 'react';
import { Animated, PanResponder, View, Text, Pressable } from 'react-native';

const CLOSED = 250;

export default function InfoSheet({
  role, timeLeft, huntLeft, alive, total, nearestM, target, onInfect,
}) {
  const y = useRef(new Animated.Value(CLOSED)).current;
  const last = useRef(CLOSED);

  const snapTo = (v) => {
    last.current = v;
    Animated.spring(y, { toValue: v, useNativeDriver: true }).start();
  };

  // pop open when the plaguer gets in range
  useEffect(() => { if (target) snapTo(0); }, [target?.id]);

  const pan = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 5,
    onPanResponderMove: (_, g) => y.setValue(Math.min(CLOSED, Math.max(0, last.current + g.dy))),
    onPanResponderRelease: (_, g) => snapTo(last.current + g.dy < CLOSED / 2 ? 0 : CLOSED),
  })).current;

  const isPlaguer = role === 'infected';
  const hunting = huntLeft === 0;
  const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <Animated.View {...pan.panHandlers} style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, height: 340,
      backgroundColor: '#202020', borderTopLeftRadius: 20, borderTopRightRadius: 20,
      borderTopWidth: 2, borderColor: '#39FF14', padding: 16,
      transform: [{ translateY: y }] }}>

      <View style={{ alignSelf: 'center', width: 48, height: 5, borderRadius: 3, backgroundColor: '#777', marginBottom: 10 }} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: isPlaguer ? '#39FF14' : '#E87722', fontSize: 16, fontWeight: '900', letterSpacing: 1 }}>
          {isPlaguer ? 'PLAGUER' : 'STUDENT SURVIVOR'}
        </Text>
        <Text style={{ color: '#E87722', fontSize: 26, fontWeight: '900' }}>{mmss(timeLeft)}</Text>
      </View>

      {!hunting && (
        <Text style={{ color: '#39FF14', fontSize: 16, fontWeight: '800', marginTop: 10 }}>
          SPREAD OUT. Hunt begins in {mmss(huntLeft)}
        </Text>
      )}

      <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700', marginTop: 10 }}>
        Survivors alive: {alive} / {total}
      </Text>

      {isPlaguer && nearestM != null && (
        <Text style={{ color: '#ccc', fontSize: 16, marginTop: 6 }}>Nearest survivor: {nearestM} m</Text>
      )}

      {target && (
        <Pressable onPress={onInfect} style={({ pressed }) => ({
          marginTop: 14, height: 55, borderRadius: 12, borderWidth: 2, borderColor: '#E87722',
          backgroundColor: '#861F41', justifyContent: 'center', alignItems: 'center',
          transform: [{ scale: pressed ? 0.96 : 1 }] })}>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: '900' }}>INFECT {target.name}</Text>
        </Pressable>
      )}

      <Text style={{ color: '#FF3B3B', fontSize: 15, marginTop: 14 }}>
        ● Red = an infection happened somewhere in this area
      </Text>
      <Text style={{ color: '#64FF70', fontSize: 15, marginTop: 6 }}>
        ● Green = safe zone. Survivors inside can't be infected
      </Text>
    </Animated.View>
  );
}